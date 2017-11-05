/**
 * Created by Robert Alexander on 16/10/2017.
 */
//Not currently used, as workaround in place for admin access

'use strict';

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
