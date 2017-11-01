/**
 * Created by Robert Alexander on 14/10/2017.
 */
'use strict';

const Hoot = require('../models/hoot');
const User = require('../models/user');
const Joi = require('joi');

exports.home = {

  handler: (request, reply) => {
    reply.view('home', { title: 'Welcome to Hoot Hoots' });
  },

};

exports.report = {

  handler: function (request, reply) {
    Hoot.find({}).populate('hooter').then(allHoots => {
      reply.view('report', {
        title: 'Hoots to Date',
        hoots: allHoots,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.hoot = {

  validate: {

    payload: {
      hootmain: Joi.string().min(3).max(140).required(),
      hashtag: Joi,
    },

    failAction: function (request, reply, source, error) {
      reply.view('home', {
        title: 'Hoot creation error',
        errors: error.data.details,
      }).code(400);
    },

    options: {
      abortEarly: false,
    },

  },

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const hoot = new Hoot(data);
      hoot.hooter = user._id;
      return hoot.save();
    }).then(newHoot => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.deletehoot = {
  handler: function (request, reply) {
    const hoots = Object.keys(request.payload);
    hoots.forEach(function (id) {
      Hoot.findByIdAndRemove(id, function (err) {
        if (err) throw err;
        console.log('Deleted id: ' + id);
      });
    });

    reply.redirect('/report');

  },
};
