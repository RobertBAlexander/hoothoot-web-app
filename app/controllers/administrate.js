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
      const totalUsers = allUsers.length;
      Hoot.find({}).populate('hoot').then(allHoots => {
        const totalHoots = allHoots.length;
        const averageHoots = Math.round(totalHoots / totalUsers);
        let totalFollowers = 0;

        for (let i = 0; i < allUsers.length; i++)
        {
          totalFollowers = totalFollowers + allUsers[i].followers.length;
          console.log('user' + allUsers[i].firstName);
        }

        const allFollowers = allUsers[2].followers.length;
        const averageFollow = Math.round(totalFollowers / allUsers.length);
        //const allFollowers = totalFollowers;

        reply.view('adminhome', {
          title: 'Users to Date',
          users: allUsers,
          totalUsers: totalUsers,
          totalHoots: totalHoots,
          averageHoots: averageHoots,
          //allFollowers: allFollowers,
          averageFollow: averageFollow,
        });
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
    const plaintextPassword = user.password;
    bcrypt.hash(plaintextPassword, saltRounds, function (err, hash) {
      user.password = hash;
      return user.save().then(newUser => {
        reply.redirect('/adminhome');
      }).catch(err => {
        reply.redirect('/');
      });
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
    Hoot.find({ hooter: userId }).populate('hooter').sort({ date: 'desc' }).then(userHoots => {
      reply.view('viewuser', {
        title: 'Hoots to Date for this user',
        hoots: userHoots,
        id: userId,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.deletelistuserhoot = {
  handler: function (request, reply) {
    const userId = request.params.id;
    const hoots = Object.keys(request.payload);
    hoots.forEach(function (id) {
      Hoot.findByIdAndRemove(id, function (err) {
        if (err) throw err;
        console.log('Deleted id: ' + id);
      });
    });

    reply.redirect('/adminhome');

  },
};
