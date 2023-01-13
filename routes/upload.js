const express = require('express');
const router = express.Router();
const handleErrorAsync = require('../middleware/handleErrorAsync');
const handleImg = require('../middleware/handleImg');
const { isAuthor } = require('../middleware/handleJWT');
const uploadController = require('../controllers/uploadImg');

router.post(
  '/',
  isAuthor,
  handleImg,
  handleErrorAsync(uploadController.uploadImg),
);

module.exports = router;
