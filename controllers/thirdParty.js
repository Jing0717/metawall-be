const User = require('../models/user');
const axios = require('axios');
const createUser = require('../utils/createUser');

// const google_redirect_url = process.env.GOOGLE_REDIRECT_URL;
const google_redirect_url = `${process.env.BACKEND_DOMAIN}/users/google/callback`;
const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;

const thirdPartyController = {
  loginWithGoogle: async (req, res) => {
    const query = {
      redirect_uri: google_redirect_url,
      client_id: google_client_id,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
    };
    const auth_url = 'https://accounts.google.com/o/oauth2/auth';
    const queryString = new URLSearchParams(query).toString();
    res.redirect(`${auth_url}?${queryString}`);
  },
  googleCallback: async (req, res) => {
    const code = req.query.code;
    const options = {
      code,
      clientId: google_client_id,
      clientSecret: google_client_secret,
      redirectUri: google_redirect_url,
      grant_type: 'authorization_code',
    };
    const url = 'https://oauth2.googleapis.com/token';
    const queryString = new URLSearchParams(options).toString();
    const response = await axios.post(url, queryString);

    const { id_token, access_token } = response.data;

    const { data: getData } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      },
    );
    const googleEmail = getData.email;
    const googleId = getData.id;
    const user = await User.findOne({
      $or: [{ googleId: googleId }, { email: googleEmail }],
    }).exec();
    createUser(res, user, getData, 'googleId');
  },
};

module.exports = thirdPartyController;
