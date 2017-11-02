/**
 * Created by Robert Alexander on 01/11/2017.
 */
'use strict';

const Hoot = require('../models/hoot');
const User = require('../models/user');
const Joi = require('joi');

exports.adminhome = {

  handler: function (request, reply) {
    User.find({}).populate('user').then(allUsers => {
      reply.view('adminhome', {
        title: 'Users to Date',
        users: allUsers,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.usercreation = {

  handler: function (request, reply) {
    reply.view('usercreation', { title: 'Create a new user for hooting' });
  },
};

exports.newuser = {
  auth: false,

  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('adminhome', {
        title: 'New User failed to create',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },

  },
  handler: function (request, reply) {
    const user = new User(request.payload);

    user.save().then(newUser => {
      reply.redirect('/adminhome');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.deleteuser = {

  handler: function (request, reply) {
    const userId = request.params.id;
    Hoot.remove({ hooter: userId }).then(success => {
      console.log('Removed users tweets:' + userId);
      return User.remove({ _id: userId });
    }).then(removeUserSuccess => {
      console.log('Deleted with id:' + userId);
      reply.redirect('/adminhome');
    }).catch(err => {
      console.log('Error deleting user!');
      reply.redirect('/adminhome');
    });
  },
};

exports.viewuser = {

  handler: function (request, reply) {
    const userId = request.params.id;
    Hoot.find({ hooter: userId }).populate('hooter').then(userHoots => {
      reply.view('viewuser', {
        title: 'Hoots to Date for this user',
        hoots: userHoots,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
