const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { ensureAuthenticated, ensureAuthorized } = require('../middlewares/authentication');

router.use(ensureAuthenticated);

router.get('/tags', ensureAuthorized(['admin']), tagController.getTagsPage);
router.post('/tags', ensureAuthorized(['admin']), tagController.createTag);
router.post('/tags/:tagId', ensureAuthorized(['admin']), tagController.updateTag);
router.post('/tags/:tagId/delete', ensureAuthorized(['admin']), tagController.deleteTag);

module.exports = router;
