const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthor } = require('../middleware/handleJWT');
const handleErrorAsync = require('../middleware/handleErrorAsync');
const thirdPartyController = require('../controllers/thirdParty');
const mailerController = require('../controllers/mailer');

router.post('/create', 
/*  
  #swagger.tags = ['Users']
  #swagger.summary = '註冊'
  #swagger.path = '/users/create'
  #swagger.method = 'POST'
  #swagger.produces = ["application/json"]
  #swagger.parameters['body'] = {
    in: 'body',
    type:"object",
    required: true,
    description: "資料格式",
    schema: {
      "$name": '海格',
      "$email":'hagrid@demo.com',
      "$password":'1q2w3e4R$',
      "$confirmPassword":'1q2w3e4R$',
    }
  }
*/
handleErrorAsync(userController.userCreate));
router.post('/login', 
/* #swagger.tags = ['Users']
  #swagger.summary = '登入'
  #swagger.path = '/users/login'
  #swagger.method = 'POST'
  #swagger.produces = ["application/json"]
  #swagger.parameters['body'] = {
      in: 'body',
      type :"object",
      required:true,
      description: "資料格式",
      schema: {
            "$email":'hagrid@demo.com',
            "$password":'1q2w3e4R$',
          }
      }
*/
handleErrorAsync(userController.userLogin));
router.get('/profile', isAuthor, 
/*  
  #swagger.tags = ['Users']
  #swagger.summary = '取得使用者資訊'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.responses[200] = {
    schema: {
      "message": "成功取得使用者資訊",
      "status": true,
      "data": {
        "_id": "6485177dce4b7d904c712d5b",
        "name": "海格",
        "avatar": "",
        "isValidator": true,
        "coin": 0,
        "followers": [],
        "following": []
      }
    }
  }
*/
handleErrorAsync(userController.getProfile));
router.patch('/profile', isAuthor, 
/*
  #swagger.tags = ['Users']
  #swagger.summary = '編輯個人資料 API'
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'gender options: [male, female, x]',
    required: true,
    schema: {
      $name: 'JingHi',
      $avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
      $gender: 'female'
    }
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "data": "success"
    }
  }
*/
handleErrorAsync(userController.updateProfile));
router.get('/profile/:id', isAuthor, 
/*
#swagger.tags = ['Users']
#swagger.summary = '取得單一使用者資料 API'
#swagger.security = [{
  "Bearer": []
}]
#swagger.parameters['id'] = {
  in: 'path',
  description: '測試用ID 6485177dce4b7d906c712d5d',
  required: true,
}
#swagger.responses[200] = {
  description: '',
  schema: {
    "status": true,
    "message": "成功取得指定使用者資訊",
    "data": {
      "user": {
        "_id": "6485177dce4b7d906c712d5d",
        "name": "JingHi",
        "avatar": "https://randomuser.me/api/portraits/lego/1.jpg",
        "coin": 0,
        "followers": []
      },
      "post": []
    }
  }
}
*/
handleErrorAsync(userController.getSpecUserProfile));
router.post('/update_password', isAuthor, 
/*
  #swagger.tags = ['Users']
  #swagger.summary = '更新使用者密碼'
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['body'] = {
    in: 'body',
    description: '更新密碼',
    required: true,
    schema: {
      $password: '1Q2w3e4R@',
      $confirmPassword: '1Q2w3e4R@'
    }
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "成功更新使用者密碼！",
      "data": {}
    }
  }
*/
handleErrorAsync(userController.updatePassword));
router.patch('/reset_password', 
/*
  #swagger.tags = ['Users']
  #swagger.summary = '重置使用者密碼'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'token',
    required: true,
    schema: {
      $password: '1Q2w3e4R@',
      $confirmPassword: '1Q2w3e4R@',
      $token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzI1OTM2YjI3NTYyMjFlMDUyOWYyNCIsIm5hbWUiOiJKaW5nIiwiaWF0IjoxNjg3MjQ3MTYxLCJleHAiOjE2ODczMzM1NjF9.qrhxkOzX-tEThqo47sGeLzNVMEqDiAlO4ECdXAHa9vs'
    }
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": true,
      "message": "成功更新使用者密碼！",
      "data": {}
    }
  }
*/
handleErrorAsync(userController.resetPassword));
router.post('/forget_password', 
/*
  #swagger.tags = ['Users']
  #swagger.summary = '忘記密碼發送重設信件'
  #swagger.parameters['body'] = {
    in: 'body',
    description: '請輸入確實可收信的信箱，並取得信件裡的token',
    required: true,
    schema: {
      $email: 'Jing@demo.com'
    }
  }
*/
handleErrorAsync(mailerController.sendResetEmail));
router.post('/:id/follow', isAuthor, 
/*
  #swagger.tags = ['Users']
  #swagger.summary = '追蹤會員'
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '被追蹤的ID 64918305e9b35160f6ab2c64',
  required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": "success",
      "message": "您已成功追蹤！"
    }
  }
*/
handleErrorAsync(userController.addFollower));
router.delete('/:id/unfollow', isAuthor, 
/*
  #swagger.tags = ['Users']
  #swagger.summary = '取消追蹤會員'
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.parameters['id'] = {
  in: 'path',
  description: '取消追蹤的ID 64918305e9b35160f6ab2c64',
  required: true,
  }
  #swagger.responses[200] = {
    description: '',
    schema: {
      "status": "success",
      "message": "您已成功取消追蹤！"
    }
  }
*/
handleErrorAsync(userController.deleteFollower));
router.get('/getLikesList', isAuthor, 
/*  
  #swagger.tags = ['Users']
  #swagger.summary = '取得likesList'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.responses[200] = {
    schema: {
      "status": true,
      "message": "成功取得按讚文章表單",
      "data": [
        {
          "following": [
            {
              "user": {
                "_id": "64918305e9b35160f6ab2c64",
                "name": "Jingtest",
                "avatar": "",
                "coin": 0
              },
              "createdAt": "2023-06-20T10:53:29.912Z"
            }
          ]
        }
      ]
    }
  }
*/
handleErrorAsync(userController.getLikesList));
router.get('/getFollowList', isAuthor, 
/*  
  #swagger.tags = ['Users']
  #swagger.summary = '取得追蹤名單'
  #swagger.produces = ["application/json"]
  #swagger.security = [{
    "Bearer": []
  }]
  #swagger.responses[200] = {
    schema: {
      "status": true,
      "message": "成功取得追蹤名單",
      "data": [
        {
          "following": [
            {
              "user": {
                "_id": "64918305e9b35160f6ab2c64",
                "name": "Jingtest",
                "avatar": "",
                "coin": 0
              },
              "createdAt": "2023-06-20T10:53:29.912Z"
            }
          ]
        }
      ]
    }
  }
*/
handleErrorAsync(userController.getFollowList));
router.get('/google',
// #swagger.tags = ['Users']
// #swagger.summary = 'google第三方登入'
handleErrorAsync( thirdPartyController.loginWithGoogle));
router.get('/google/callback',
// #swagger.tags = ['Users']
// #swagger.summary = 'google第三方登入callback'
handleErrorAsync( thirdPartyController.googleCallback));
router.get('/facebook', 
// #swagger.tags = ['Users']
// #swagger.summary = 'facebook第三方登入'
handleErrorAsync(thirdPartyController.loginWithFacebook));
router.get('/facebook/callback', 
// #swagger.tags = ['Users']
// #swagger.summary = 'facebook第三方登入callback'
handleErrorAsync(thirdPartyController.facebookCallback));
router.get('/line', 
// #swagger.tags = ['Users']
// #swagger.summary = 'line第三方登入'
handleErrorAsync(thirdPartyController.loginWithLine));
router.get('/line/callback', 
// #swagger.tags = ['Users']
// #swagger.summary = 'line第三方登入callback'
handleErrorAsync(thirdPartyController.lineCallback));
router.get('/discord', 
// #swagger.tags = ['Users']
// #swagger.summary = 'discord第三方登入'
handleErrorAsync(thirdPartyController.loginWithDiscord));
router.get('/discord/callback', 
// #swagger.tags = ['Users']
// #swagger.summary = 'discord第三方登入callback'
handleErrorAsync(thirdPartyController.discordCallback));

module.exports = router;
