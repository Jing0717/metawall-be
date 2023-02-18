const Message = require('../models/message');

const successHandle = require('../utils/successHandle');
const appError = require('../utils/appError');

const chatController = {
  enterChatRoom: async (req, res, next) => {
    const userData = {
      avatar: req.user.avatar,
      name: req.user.name,
      enterAt: new Date().getTime(),
    };
    const { socketId } = req.body;
    const messages = await Message.find();
    res.io.emit(socketId, messages);
    res.io.emit('coming', userData);
    return successHandle(res, '使用者進入並回傳聊天室紀錄', messages);
  },
  storeMessage: async (req, res, next) => {
    const { content } = req.body;
    if (typeof content === undefined || content === null || content?.trim() === '') {
      return appError(400, '請正確填寫內容欄位，內容欄位不得為空', next);
    }

    const newMessage = await Message.create({
      userId: req.user._id,
      content: content,
    });
    const result = await Message.findById(newMessage._id);
    const returnMessage = {
      content: result.content,
      createdAt: result.createdAt,
      userId: result.userId,
    };
    res.io.emit('chat message', returnMessage);
    return successHandle(res, '成功送出聊天訊息', returnMessage);
  },
};

module.exports = chatController;
