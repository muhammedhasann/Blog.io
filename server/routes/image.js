const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageController = require('../controllers/imageController');
const { ensureAuthenticated, ensureAuthorized } = require('../middlewares/authentication');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(ensureAuthenticated);

router.post('/images/upload', ensureAuthorized(['author', 'admin']), upload.single('image'), imageController.uploadImage);
router.post('/images/:imageId/delete', ensureAuthorized(['author', 'admin']), imageController.deleteImage);
router.get('/images/gallery', ensureAuthorized(['author', 'admin']), imageController.getImageGallery);

module.exports = router;
