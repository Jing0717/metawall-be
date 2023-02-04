const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthor } = require('../middleware/handleJWT');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const thirdPartyController = require('../controllers/thirdParty');

router.post('/create', handleErrorAsync(userController.userCreate));
router.post('/login', handleErrorAsync(userController.userLogin));
router.get('/profile', isAuthor, handleErrorAsync(userController.getProfile));
router.patch('/profile', isAuthor, handleErrorAsync(userController.updateProfile));
router.get('/profile/:id', isAuthor, handleErrorAsync(userController.getSpecUserProfile));
router.post('/update_password', isAuthor, handleErrorAsync(userController.updatePassword));
router.patch('/reset_password', handleErrorAsync(userController.resetPassword));

router.post('/:id/follow', isAuthor, handleErrorAsync(userController.addFollower));
router.delete('/:id/unfollow', isAuthor, handleErrorAsync(userController.deleteFollower));
router.get('/getLikesList', isAuthor, handleErrorAsync(userController.getLikesList));
router.get('/getFollowList', isAuthor, handleErrorAsync(userController.getFollowList));

router.get('/google', thirdPartyController.loginWithGoogle);
router.get('/google/callback', thirdPartyController.googleCallback);
module.exports = router;
