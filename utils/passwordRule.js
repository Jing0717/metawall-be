const appError = require('../utils/appError');
const passwordRule =
  /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()_+<>?:"{},.\/\\;'[\]]).*$/;

const passwordCheck = (password, next) => {
  if (!passwordRule.test(password)) {
    return appError(
      400,
      '密碼強度不足，請確認是否具至少有 1 個數字， 1 個大寫英文， 1 個小寫英文',
      next,
    );
  }
};

module.exports = { passwordRule, passwordCheck };
