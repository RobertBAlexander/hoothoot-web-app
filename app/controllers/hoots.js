/**
 * Created by Robert Alexander on 14/10/2017.
 */
'use strict';

const Hoot = require('../models/hoot');
const User = require('../models/user');
const Joi = require('joi');

exports.home = {
  auth: false,
  handler: (request, reply) => {
    reply.view('home', { title: 'Welcome to Hoot Hoots' });
  },

};

exports.report = {
  auth: false,
  handler: function (request, reply) {
    let userEmail = request.auth.credentials.loggedInUser;

    User.findOne({ email: userEmail }).then(currentUser => {
      const followers = currentUser.followers.length;
      const following = currentUser.following.length;
      Hoot.find({ hooter: currentUser._id }).populate('hooter')
          .sort({ date: 'desc' }).then(hootList => {
        reply.view('report', {
          title: 'Hoots to Date',
          followers: followers,
          following: following,
          hoots: hootList,
        });
      }).catch(err => {
        reply.redirect('/');
      });
    });
  },

};

exports.allhootslist = {
  auth: false,
  handler: function (request, reply) {
    //var userEmail = request.auth.credentials.loggedInUser;
    User.find({}).populate('user').then(allUsers => {
            //if (allUsers.followers._id == userEmail.id)
            const follow = 1;
            Hoot.find({}).populate('hooter').sort({ date: 'desc' }).then(allHoots => {
                    reply.view('allhootslist', {
                      title: 'All Hoots to Date',
                      hoots: allHoots,
                      users: allUsers,
                      follow: follow,
                    });
                  }).catch(err => {
                    reply.redirect('/');
                  });
          });
  },

};

exports.viewotheruser = {
  auth: false,
  handler: function (request, reply) {
    const userId = request.params.id;
    Hoot.find({ hooter: userId }).populate('hooter').sort({ date: 'desc' }).then(userHoots => {
      reply.view('viewotheruser', {
        title: 'Hoots to Date for this user',
        hoots: userHoots,
        id: userId,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },
};

exports.hoot = {
  auth: false,
  validate: {

    payload: {
      hootmain: Joi.string().min(3).max(140).required(),
      hashtag: Joi,
      picture: Joi,
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
    let userEmail = request.auth.credentials.loggedInUser;
    let hootPic = request.payload.picture;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const hoot = new Hoot(data);
      const date = new Date().toString().substring(0, 25);
      hoot.hooter = user._id;
      hoot.date = date;
      if (hootPic) {//hootPic.length
        hoot.picture.data = hootPic;
      }

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

exports.deleteallhoots = {

  handler: function (request, reply) {
    const userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      Hoot.remove({ hooter: user._id }).then(success => {
        console.log('Removed users tweets:' + userId);
        reply.redirect('/report');
      }).catch(err => {
        reply.redirect('/report');
      });
    });
  },
};

exports.getPic = {
  handler: function (request, reply)
  {
    let hootId = request.params.id;
    Hoot.findOne({ _id: hootId }).exec((err, hoot) => {
      if (hoot.picture.data)
      {
        reply(hoot.picture.data).type('image');
      }
    });
  },
};
