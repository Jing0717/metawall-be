const User = require('../models/user');
const appError = require('../utils/appError');
const successHandle = require('../utils/successHandle');

const userController = {
  signUp: async (req, res, next) => {
    let { email, password, confirmPassword, name } = req.body;
    if (!email || !password || !confirmPassword || !name) {
      return appError(400, '欄位未正確填寫', next);
    }

    const user = await User.findOne({ email }).exec();
    if (user) {
      return appError(400, '此帳號已有人使用，請試試其他 Email 帳號', next);
    }

    const userData = {
      name,
      email,
      password,
      isValidator: true,
    };
    const currentUser = await User.create(userData);
    return successHandle(res, '成功建立使用者帳號', { user: currentUser });

  },
};

module.exports = userController;
