const mongoose = require('mongoose');

const UserModel = mongoose.model('Users', {
  userName: String,
  password: String,
  userId: String,
});

module.exports = UserModel;
