/**
 * Created by Robert Alexander on 14/10/2017.
 */
'use strict';
const User = require('../models/user');
const Joi = require('joi');
const uuid = require('uuid');

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Hoot Hoot' });
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Hoot Hoot' });
  },

};

exports.register = {
  auth: false,

  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      //isFollowed: Joi.string('true'),
    },

    failAction: function (request, reply, source, error) {
      reply.view('signup', {
        title: 'Sign up error',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },

  },

  handler: function (request, reply) {
    let data = request.payload;
    const user = new User(data);

    user.save().then(newUser => {
      reply.redirect('/login');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Hoot' });
  },

};

exports.authenticate = {
  auth: false,

  validate: {

    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('login', {
        title: 'Sign in error',
        errors: error.data.details,
      }).code(400);
    },

  },
  handler: function (request, reply) {
    const user = request.payload;
    if (user.email == 'admin@hoot.com' && user.password == 'admin')
    {
      request.cookieAuth.set({
        loggedIn: true,
        loggedInUser: user.email,
      });
      reply.redirect('/adminhome');
    } else {
      User.findOne({ email: user.email }).then(foundUser => {
        if (foundUser && foundUser.password === user.password) {
          request.cookieAuth.set({
            loggedIn: true,
            loggedInUser: user.email,
          });
          reply.redirect('/home');
        } else {
          reply.redirect('/signup');
        }
      }).catch(err => {
        reply.redirect('/');
      });
    }
  },

};

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

exports.viewSettings = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(foundUser => {
      reply.view('settings', { title: 'View and change your details', user: foundUser });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.updateSettings = {
  validate: {

    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string().regex(/^[A-Z]{1,3}[']?[a-zA-Z]{3,14}[-]?[A-Z]{0,3}[']?[a-zA-Z]{0,14}$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },

    options: {
      abortEarly: false,
    },

    failAction: function (request, reply, source, error) {
      reply.view('settings', {
        title: 'Update error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    const editedUser = request.payload;
    const loggedInUserEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: loggedInUserEmail }).then(user => {
      user.firstName = editedUser.firstName;
      user.lastName = editedUser.lastName;
      user.email = editedUser.email;
      user.password = editedUser.password;
      return user.save();
    }).then(user => {
      reply.view('settings', { title: 'Edit Account Settings', user: user });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.followuser = {
  handler: function (request, reply) {
    let loggedInUser = request.auth.credentials.loggedInUser;
    const userId = request.params.id;
    User.findOne({ email: loggedInUser }).then(currentUser => {
      User.findOne({ _id: userId }).then(foundUser => {
        currentUser.following.push(foundUser._id);
        foundUser.followers.push(currentUser._id);
        currentUser.save();
        foundUser.save();
        reply.redirect('/allhootslist');
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.unfollowuser = {
  handler: function (request, reply) {
    let loggedInUser = request.auth.credentials.loggedInUser;
    const userId = request.params.id;
    User.findOne({ email: loggedInUser }).then(currentUser => {
      User.findOne({ _id: userId }).then(foundUser => {
        currentUser.following.splice(foundUser._id, 1);
        foundUser.followers.splice(currentUser._id, 1);
        currentUser.save();
        foundUser.save();
        reply.redirect('/allhootslist');
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};
