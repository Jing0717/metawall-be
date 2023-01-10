const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const successHandle = require('../utils/successHandle');
const appError = require('../utils/appError');
const { generateToken } = require('../middleware/handleJWT');
const { passwordCheck } = require('../utils/passwordRule');

const userController = {
  userCreate: async (req, res, next) => {
    let { email, password, confirmPassword, name } = req.body;
    if (!email || !password || !confirmPassword || !name) {
      return appError(400, '欄位未正確填寫', next);
    }
    if (name.length <= 1) {
      return appError(400, '名字長度至少 2 個字', next);
    }
    if (password.length <= 7 || confirmPassword.length <= 7) {
      return appError(400, '密碼長度至少 8 個字', next);
    }
    if (!validator.isEmail(email)) {
      return appError(400, '請正確輸入 email 格式', next);
    }
    passwordCheck(password, next);
    if (password !== confirmPassword) {
      return appError(400, '請確認兩次輸入的密碼是否相同', next);
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
    const userPayload = {
      id: currentUser._id,
      name: currentUser.name,
      avatar: currentUser.avatar,
    };
    const token = generateToken(currentUser);
    return successHandle(res, '成功建立使用者帳號', { token, user: userPayload });
  },
  userLogin: async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return appError(400, 'email 或 password 欄位未正確填寫', next);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return appError(404, '無此使用者資訊請確認 email 帳號是否正確', next);
    }
    const userPassword = await User.findOne({ email }).select('+password');
    const checkPassword = bcrypt.compareSync(req.body.password, userPassword.password);
    if (!checkPassword) {
      return appError(400, '請確認密碼是否正確，請再嘗試輸入', next);
    }
    const userPayload = {
      id: user._id,
      name: user.name,
      avatar: user.avatar,
      coin: user.coin,
    };
    const token = generateToken(user);
    return successHandle(res, '登入成功', { token, user: userPayload });
  },
  getProfile: async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    return successHandle(res, '成功取得使用者資訊', user);
  },
  getSpecUserProfile: async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID).select('-isValidator -following -gender');
    return successHandle(res, '成功取得指定使用者資訊', { user });
  },
  updatePassword: async (req, res, next) => {
    let { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return appError(400, '欄位未正確填寫', next);
    }
    if (password.length <= 7 || confirmPassword.length <= 7) {
      return appError(400, '密碼長度至少 8 個字', next);
    }
    passwordCheck(password, next);
    if (password !== confirmPassword) {
      return appError(400, '請確認兩次輸入的密碼是否相同', next);
    }
    const userId = req.user.id;
    const salt = bcrypt.genSaltSync(8);
    const newPassword = bcrypt.hashSync(password, salt);
    await User.findByIdAndUpdate(userId, { password: newPassword });
    return successHandle(res, '成功更新使用者密碼！', {});
  },
  resetPassword: async (req, res, next) => {
    const { token } = req.body;
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      return appError(400, '欄位未正確填寫', next);
    }
    if (password.length <= 7 || confirmPassword.length <= 7) {
      return appError(400, '密碼長度至少 8 個字', next);
    }
    passwordCheck(password, next);
    if (password !== confirmPassword) {
      return appError(400, '請確認兩次輸入的密碼是否相同', next);
    }

    const decoded = jwt.verify(token, jwtSecret);

    const userId = decoded.id;
    const user = await User.findById(userId).select('+resetToken').exec();
    if (token !== user.resetToken) {
      return appError(400, '此驗證連結已失效請重新執行忘記密碼', next);
    }
    const salt = bcrypt.genSaltSync(8);
    const newPassword = bcrypt.hashSync(password, salt);
    await User.findByIdAndUpdate(userId, { password: newPassword, resetToken: '' });
    return successHandle(res, '成功重置使用者密碼！請使用新密碼登入');
  },
  updateProfile: async (req, res, next) => {
    let { name, avatar, gender } = req.body;
    if (!name && !avatar && !gender) {
      return appError(400, '要修改的欄位未正確填寫', next);
    }
    if (!validator.isURL(avatar)) {
      return appError(400, '請確認照片是否傳入網址', next);
    }
    const userId = req.user.id;
    const userData = { name, avatar, gender };
    await User.findByIdAndUpdate(userId, userData, { runValidators: true });
    const user = await User.findById(userId);
    const returnUser = { name: user.name, gender: user.gender, avatar: user.avatar };
    return successHandle(res, '成功更新使用者資訊！', returnUser);
  },
};

module.exports = userController;
