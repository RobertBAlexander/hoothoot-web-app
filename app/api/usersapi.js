/**
 * Created by Robert Alexander on 31/10/2017.
 */
const User = require('../models/user');
const Boom = require('boom');
const utils = require('./utils.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.find = {

  auth: false,

  handler: function (request, reply) {
    User.find({}).exec().then(users => {
      reply(users);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    User.findOne({ _id: request.params.id }).then(user => {
      if (user != null) {
        reply(user);
      } else {
        reply(Boom.notFound('id not found'));
      }
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },
};

exports.create = {

  auth: false,

  handler: function (request, reply) {
    const user = new User(request.payload);
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      user.password = hash;
      user.save().then(newUser => {
        reply(newUser).code(201);
      }).catch(err => {
        reply(Boom.badImplementation('error creating user'));
      });
    });
  },

};

exports.update = {

  auth: false,
  handler: function (request, reply) {
    const user = User(request.payload);
    User.findOne({ _id: user._id }).then(oldUser => {
      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (user.password != '') {
          user.password = hash;
        } else {
          user.password = oldUser.password;
        }

        console.log(user);
        user.update(user).then(updatedUser => {
          reply(updatedUser).code(201);
        }).catch(err => {
          reply(Boom.badImplementation('error updating User'));
        });
      });
    });
  },
};

exports.deleteAll = {

  auth: false,

  handler: function (request, reply) {
    User.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing users'));
    });
  },

};

exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    User.remove({ _id: request.params.id }).then(user => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};

exports.authenticate = {

  auth: false,

  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({ email: user.email }).then(foundUser => {
      bcrypt.compare(user.password, foundUser.password, function (err, isUser) {
        if (isUser) {
          reply(foundUser).code(201);
        } else {
          reply(false).code(204);
        }
      }).catch(err => {
        reply(Boom.notFound('internal db failure'));
      });
    });
  },

};

/*exports.authenticate = {

  auth: false,

  handler: function (request, reply) {
    const user = request.payload;
    User.findOne({ email: user.email }).then(foundUser => {
      if (foundUser && foundUser.password === user.password) {
        const token = utils.createToken(foundUser);
        reply({ success: true, token: token }).code(201);
      } else {
        reply({ success: false, message: 'Authentication failed. User not found.' }).code(201);
      }
    }).catch(err => {
      reply(Boom.notFound('internal db failure'));
    });
  },

};*/

exports.follow = {
  auth: false,

  handler: function (request, reply) {
    //let loggedInUser = request.auth.credentials.loggedInUser;
    let userId = request.params.id;
    let followId = request.payload;
    User.findOne({ _id: userId }).then(currentUser => {
      User.findOne({ _id: followId }).then(foundUser => {
        currentUser.following.push(foundUser._id);
        foundUser.followers.push(currentUser._id);
        foundUser.isFollowed = true;
        foundUser.save();
        currentUser.save().then(User => {
          reply(User).code(201);
        });
      });
    }).catch(err => {
      reply(Boom.badImplementation('Error following user'));
    });
  },
};

exports.unfollow = {
  auth: false,

  handler: function (request, reply) {
    //let loggedInUser = request.auth.credentials.loggedInUser;
    let userId = request.params.id;
    let unfollowId = request.payload;
    User.findOne({ _id: userId }).then(currentUser => {
      User.findOne({ _id: unfollowId }).then(foundUser => {
        currentUser.following.remove(unfollowId);
        foundUser.followers.remove(userId);
        foundUser.isFollowed = false;
        foundUser.save();
        currentUser.save().then(User => {
          reply(User).code(201);
        });
      });
    }).catch(err => {
      reply(Boom.badImplementation('Error unfollowing user'));
    });
  },
};
