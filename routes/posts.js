const express = require('express');
const router = express.Router();
const handleErrorAsync = require('../middleware/handleErrorAsync');
const postController = require('../controllers/post');
const { isAuthor } = require('../middleware/handleJWT');

router.get('/', isAuthor,
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '取得所有貼文'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.responses[200] = {
    schema: {
      "status": true,
      "message": "成功撈取所有貼文",
      "data": [
        {
          "_id": "645a1259423482a9d96136ff",
          "content": "test",
          "image": "https://i.imgur.com/lZlY74.png",
          "userId": {
            "_id": "63c25936b2756221e0529f24",
            "name": "Jing",
            "avatar": "https://i.imgur.com/ZJ2A1T.png",
            "coin": 0,
            "gender": "x"
          },
          "likes": [],
          "createdAt": "2023-05-09T09:28:57.176Z",
          "comments": []
        }
      ]
    }
  }
*/
handleErrorAsync(postController.getAll));
router.get('/:id', isAuthor,
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '取得一則貼文'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '貼文ID ex. 645a1259423482a9d96136ff',
  required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": "success",
      "message": "成功取得一則貼文",
      "data":{}
    }
  }
*/
handleErrorAsync(postController.getOne));
router.post('/create', isAuthor, 
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '新增一則貼文'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['body'] = {
    in: 'body',
    type:"object",
    required: true,
    description: "資料格式",
    schema: {
      "$content": '文章內容',
      "$image":'圖片URL',
    }
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "成功新增一則貼文!!",
      "data": {
        "id": "6485177dce4b7d906c712d5d",
        "content": "文章內容",
        "image": "https://i.imgur.com/ZJ2A1T.png"
      }
    }
  }
*/
handleErrorAsync(postController.postCreate));
router.delete('/:id', isAuthor, 
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '刪除一則貼文'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: '文章的ID',
    required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "刪除一則貼文"
    }
  }
*/
handleErrorAsync(postController.postDelete));
router.patch('/:id', isAuthor, 
/*
  #swagger.tags = ['Posts']
  #swagger.summary = '編輯貼文'
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
    in: 'path',
    description: '文章的ID',
    required: true,
  }
  #swagger.parameters['body'] = {
    in: 'body',
    type:"object",
    required: true,
    description: "資料格式",
    schema: {
      "$content": '文章內容',
      "$image":'圖片URL',
    }
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "成功編輯一則貼文!!",
      "data": {
        "_id": "6491aac325dd3a784fd1cfee",
        "content": "文章內容",
        "image": "圖片URL",
        "userId": {
          "_id": "6485177dce4b7d906c712d5d",
          "name": "JingHi",
          "avatar": "https://randomuser.me/api/portraits/lego/1.jpg",
          "coin": 0,
          "gender": "female"
        },
        "likes": [],
        "createdAt": "2023-06-20T13:33:55.640Z"
      }
    }
  }
*/
handleErrorAsync(postController.postPatch));
router.get('/user/:id', 
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '取得單一會員貼文'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '會員ID ex. 63c25936b2756221e0529f24',
  required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "成功取得單一會員所有貼文",
      "data":{}
    }
  }
*/
handleErrorAsync(postController.getUserPosts));
router.post('/:id/likes', isAuthor, 
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '新增一個讚'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '文章的ID',
  required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "新增一個讚"
    }
  }
*/
handleErrorAsync(postController.addLike));
router.delete('/:id/likes', isAuthor, 
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '刪除一個讚'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '文章的ID',
  required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "刪除一個讚"
    }
  }
*/
handleErrorAsync(postController.deleteLike));
router.post('/:id/comment', isAuthor, 
/*  
  #swagger.tags = ['Posts']
  #swagger.summary = '新增一則留言'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '文章的ID, ex. 6491aac325dd3a784fd1cfee',
  required: true,
  }
  #swagger.parameters['body'] = {
    in: 'body',
    type:"object",
    required: true,
    description: "資料格式",
    schema: {
      "$comment": '文章內容',
    }
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "成功新增一則留言",
      "data": {
        "comment": "文章內容test",
        "user": {
          "_id": "6485177dce4b7d906c712d5d",
          "name": "JingHi",
          "avatar": "https://randomuser.me/api/portraits/lego/1.jpg",
          "coin": 0,
          "gender": "female"
        },
        "post": "6491aac325dd3a784fd1cfee",
        "_id": "6491bd1cf82abe2752617e2e",
        "createdAt": "2023-06-20T14:52:12.410Z"
      }
    }
  }
*/
handleErrorAsync(postController.addComment));


module.exports = router;