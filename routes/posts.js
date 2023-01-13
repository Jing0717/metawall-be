const express = require('express');
const router = express.Router();
const handleErrorAsync = require('../middleware/handleErrorAsync');
const postController = require('../controllers/post');
const { isAuthor } = require('../middleware/handleJWT');

router.get('/', isAuthor, handleErrorAsync(postController.getAll));
router.get('/:id', isAuthor, handleErrorAsync(postController.getOne));
router.post('/create', isAuthor, handleErrorAsync(postController.postCreate));
router.delete('/:id', isAuthor, handleErrorAsync(postController.postDelete));
router.patch('/:id', isAuthor, handleErrorAsync(postController.postPatch));
router.get('/user/:id', handleErrorAsync(postController.getUserPosts));

module.exports = router;