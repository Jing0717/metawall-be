const Post = require('../models/post');
const successHandle = require('../utils/successHandle');
const appError = require('../utils/appError');
const { default: mongoose } = require('mongoose');

const postController = {
  getAll: async (req, res) => {
    let { timeSort = 'asc', q, type = '', page = 0 } = req.query;
    const query = q !== undefined ? { content: new RegExp(q) } : {};
    const post = await Post.find(query)
      .populate({
        path: 'userId',
        select: 'name avatar',
      })
      .skip(page * 20)
      .sort({ createdAt: `${timeSort === 'asc' ? -1 : 1}` });
    if (type) {
      post.sort((a, b) => {
        if (timeSort === 'asc') {
          return a[type].length - b[type].length;
        } else {
          return b[type].length - a[type].length;
        }
      });
    }
    successHandle(res, '成功撈取所有貼文', post);
  },
  getOne: async (req, res, next) => {
    const { id: _id } = req.params;
    if (!_id) {
      return appError(400, '無此貼文', next);
    }
    let getOneResult = await Post.findById({ _id })
      .populate({path: 'userId'});
    return successHandle(res, '成功取得一則貼文', getOneResult);
  },
  postCreate: async (req, res, next) => {
    const { content, image = '' } = req.body;

    if (content === undefined || content === "") {
      return appError(400, '你沒有填寫 content 資料', next);
    }

    const newPost = await Post.create({
      userId: req.user._id,
      content,
      image,
    });
    const returnPost = {
      id: newPost.userId,
      content: newPost.content,
      image: newPost.image,
    };

    return successHandle(res, '成功新增一則貼文!!', returnPost);
  },
  postDelete: async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
      return appError(400, '無此貼文', next);
    }
    let deleteResult = await Post.findByIdAndDelete({ _id: id });
    if (!deleteResult) {
      return appError(400, '刪除貼文失敗', next);
    }

    return successHandle(res, '刪除一則貼文');
  },
  postPatch: async (req, res, next) => {
    const { content = '', image = '' } = req.body;
    const { id } = req.params;
    let _id = mongoose.Types.ObjectId(id);
    if (!content) appError(400, '請檢查content 資料', next);

    const editPost = await Post.findByIdAndUpdate({ _id }, { content, image }, { new: true });

    if (editPost === null || editPost === undefined) {
      appError(400, '請檢查content 資料', next);
    }

    successHandle(res, '成功編輯一則貼文!!', editPost);
  },
  getUserPosts: async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
      appError(400, '尚未帶入 User ID', next);
    }
    const getPosts = await Post.find({ userId });
    if (!getPosts) {
      appError(400, '查無此 User', next);
    }
    successHandle(res, '成功取得單一會員所有貼文', getPosts);
  },
};
module.exports = postController;
