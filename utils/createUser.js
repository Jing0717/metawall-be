const User = require('../models/user');
const { generateToken } = require('../middleware/handleJWT');
const createEmail = require('./createEmail');
const { randomPassword } = require('./passwordRule');

const frontendHost = process.env.FRONTEND_DOMAIN;

module.exports = async function createUserData(res, user, getData, thirdParty) {
  if (!user) {
    const data = {
      name: getData.name,
      password: randomPassword(),
      [`${thirdParty}`]: getData.id,
      email: getData.email || createEmail(),
      avatar: getData.picture,
    };
    const userData = await User.create(data);
    const token = generateToken(userData);
    const authParams = new URLSearchParams({
      token,
      id: userData._id,
      avatar: userData.avatar,
      name: userData.name,
      coin: userData.coin,
    }).toString();
    return res.redirect(`${frontendHost}?${authParams}`);
  }
  const token = generateToken(user);
  const authParams = new URLSearchParams({
    token,
    id: user._id,
    avatar: user.avatar,
    name: user.name,
    coin: user.coin,
  }).toString();
  return res.redirect(`${frontendHost}?${authParams}`);
};
