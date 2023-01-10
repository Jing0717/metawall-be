const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthor } = require('../middleware/handleJWT');
const handleErrorAsync = require('../middleware/handleErrorAsync');

router.post('/create', handleErrorAsync(userController.userCreate));
router.post('/login', handleErrorAsync(userController.userLogin));
router.get('/profile', isAuthor, handleErrorAsync(userController.getProfile));
router.patch('/profile', isAuthor, handleErrorAsync(userController.updateProfile));
router.get('/profile/:id', isAuthor, handleErrorAsync(userController.getSpecUserProfile));
router.post('/update_password', isAuthor, handleErrorAsync(userController.updatePassword));
router.patch('/reset_password', handleErrorAsync(userController.resetPassword));

module.exports = router;
