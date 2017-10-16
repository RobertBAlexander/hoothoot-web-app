/**
 * Created by Robert Alexander on 16/10/2017.
 */
'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;