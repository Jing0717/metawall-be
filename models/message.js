const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, '使用者的 ID 為必要項目'],
      ref: 'User',
    },
  },
  { versionKey: false },
);
messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'userId',
    select: '-following -isValidator -followers -gender',
  });
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
