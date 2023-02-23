const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthor } = require('../middleware/handleJWT');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const thirdPartyController = require('../controllers/thirdParty');
const mailerController = require('../controllers/mailer');

router.post('/create', handleErrorAsync(userController.userCreate));
router.post('/login', handleErrorAsync(userController.userLogin));
router.get('/profile', isAuthor, handleErrorAsync(userController.getProfile));
router.patch('/profile', isAuthor, handleErrorAsync(userController.updateProfile));
router.get('/profile/:id', isAuthor, handleErrorAsync(userController.getSpecUserProfile));
router.post('/update_password', isAuthor, handleErrorAsync(userController.updatePassword));
router.patch('/reset_password', handleErrorAsync(userController.resetPassword));
router.post('/forget_password', handleErrorAsync(mailerController.sendResetEmail));

router.post('/:id/follow', isAuthor, handleErrorAsync(userController.addFollower));
router.delete('/:id/unfollow', isAuthor, handleErrorAsync(userController.deleteFollower));
router.get('/getLikesList', isAuthor, handleErrorAsync(userController.getLikesList));
router.get('/getFollowList', isAuthor, handleErrorAsync(userController.getFollowList));

router.get('/google', thirdPartyController.loginWithGoogle);
router.get('/google/callback', thirdPartyController.googleCallback);
router.get('/facebook', handleErrorAsync(thirdPartyController.loginWithFacebook));
router.get('/facebook/callback', handleErrorAsync(thirdPartyController.facebookCallback));
router.get('/line', handleErrorAsync(thirdPartyController.loginWithLine));
router.get('/line/callback', handleErrorAsync(thirdPartyController.lineCallback));
module.exports = router;
