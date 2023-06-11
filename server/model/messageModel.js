const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamps: true,
});

const Message = mongoose.model('Messages', messageSchema);
module.exports = Message;
