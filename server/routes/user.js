const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authentication');
const userRoles = require('../config/roles');
const postController = require('../controllers/postController');
const checkFreeArticleLimit = require('../middlewares/checkFreeArticleLimit');
const logActivity = require('../middlewares/logActivity');


router.use(ensureAuthenticated);

router.get('/dashboard', userRoles.is('author', 'admin'), userController.dashboard);
router.get('/profile', userController.profile);
router.get('/posts/:id', checkFreeArticleLimit, postController.getSinglePost);
router.get('/edit-profile', userController.editProfilePage);
router.post('/edit-profile', userController.editProfile);
router.get('/change-password', userController.changePasswordPage);
router.post('/change-password', userController.changePassword);
router.get('/posts/:id', logActivity('viewed a post'), postController.getSinglePost);

module.exports = router;
