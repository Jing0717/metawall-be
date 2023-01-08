var express = require('express');
var router = express.Router();
const UsersControllers = require('../controllers/user');
const handleErrorAsync = require('../middleware/handleErrorAsync');

router.post('/sign_up', handleErrorAsync(UsersControllers.signUp));
router.post('/sign_in', handleErrorAsync(UsersControllers.signIn));

module.exports = router;
