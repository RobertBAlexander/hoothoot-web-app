/**
 * Created by Robert Alexander on 14/10/2017.
 */
'use strict';

const Hoot = require('../models/hoot');
const User = require('../models/user');

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
