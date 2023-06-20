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
  // #swagger.summary = '上傳圖片取得圖片網址 API'
  handleErrorAsync(uploadController.uploadImg),
);

module.exports = router;
