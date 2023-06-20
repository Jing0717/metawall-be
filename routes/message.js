const express = require('express');
const router = express.Router();
const chatController = require('../controllers/message');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const { isAuthor } = require('../middleware/handleJWT');

router.put('/', isAuthor, 
  // #swagger.summary = '使用者進入聊天室 API'
handleErrorAsync(chatController.enterChatRoom));
router.post('/', isAuthor, 
  // #swagger.summary = '使用者傳送聊天訊息 API'
handleErrorAsync(chatController.storeMessage));

module.exports = router;
