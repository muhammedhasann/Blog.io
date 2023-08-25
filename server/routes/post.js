const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { ensureAuthenticated, ensureAuthorized } = require('../middlewares/authentication');

router.use(ensureAuthenticated);

router.get('/posts', postController.getPostsPage);
router.get('/posts/:postId/edit', ensureAuthorized(['author', 'admin']), postController.getEditPostPage);
router.post('/posts', ensureAuthorized(['author', 'admin']), postController.createPost);
router.post('/posts/:postId', ensureAuthorized(['author', 'admin']), postController.updatePost);
router.post('/posts/:postId/delete', ensureAuthorized(['author', 'admin']), postController.deletePost);

module.exports = router;
