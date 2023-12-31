const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
