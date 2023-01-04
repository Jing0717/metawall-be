const mongoose = require('mongoose');

const userSchema = {
  email: {
    type: String,
    required: [true, 'email為必要資訊'],
    validate: {
      validator: function (v) {
        return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(
          v,
        );
      },
      message: '請填寫正確 email 格式 name@domain.abc',
    },
    unique: true,
    select: false,
  },
  password: {
    type: String,
    minLength: [8, '密碼至少 8 個字'],
    required: [true, '密碼欄位，請確實填寫'],
    select: false,
  },
  name: {
    type: String,
    required: [true, '名稱為必要資訊'],
    minLength: [1, '名稱請大於 1 個字'],
    maxLength: [50, '名稱長度過長，最多只能 50 個字'],
  },
  avatar: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'x'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
};

const User_Schema = new mongoose.Schema(userSchema, {
  versionKey: false,
});

const User = mongoose.model('User', User_Schema);

module.exports = User;
