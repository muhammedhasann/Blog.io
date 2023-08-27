const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { ensureAuthenticated, ensureAuthorized } = require('../middlewares/authentication');

router.use(ensureAuthenticated);

router.get('/categories', ensureAuthorized(['admin']), categoryController.getCategoriesPage);
router.post('/categories', ensureAuthorized(['admin']), categoryController.createCategory);
router.post('/categories/:categoryId', ensureAuthorized(['admin']), categoryController.updateCategory);
router.post('/categories/:categoryId/delete', ensureAuthorized(['admin']), categoryController.deleteCategory);
router.get('/categories', categoryController.getCategoriesPage);
router.get('/api/categories', categoryController.getCategoriesApi);
module.exports = router;
