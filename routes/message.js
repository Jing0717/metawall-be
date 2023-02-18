const express = require('express');
const router = express.Router();
const chatController = require('../controllers/message');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const { isAuthor } = require('../middleware/handleJWT');

router.put('/', isAuthor, handleErrorAsync(chatController.enterChatRoom));
router.post('/', isAuthor, handleErrorAsync(chatController.storeMessage));

module.exports = router;
