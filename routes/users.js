var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/user');
const handleErrorAsync = require('../middleware/handleErrorAsync');

router.post('/sign_up', handleErrorAsync(UsersControllers.signUp));

module.exports = router;
