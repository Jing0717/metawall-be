const { v4: uuidv4 } = require('uuid');

const createEmail = () => {
  const defaultAccount = uuidv4().toString();

  const result = `${defaultAccount}@test.com`;

  return result;
};

module.exports = createEmail;
