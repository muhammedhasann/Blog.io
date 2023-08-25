const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middlewares/authentication');
const userRoles = require('../config/roles');

router.use(ensureAuthenticated);

router.get('/dashboard', userRoles.is('author', 'admin'), userController.dashboard);
router.get('/profile', userController.profile);
router.get('/edit-profile', userController.editProfilePage);
router.post('/edit-profile', userController.editProfile);
router.get('/change-password', userController.changePasswordPage);
router.post('/change-password', userController.changePassword);

module.exports = router;
