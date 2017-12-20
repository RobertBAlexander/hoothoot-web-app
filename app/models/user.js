/**
 * Created by Robert Alexander on 16/10/2017.
 */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isFollowed: Boolean,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
