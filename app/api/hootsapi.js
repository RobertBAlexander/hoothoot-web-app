/**
 * Created by roberRobert Alexander
 **/
const Hoot = require('../models/hoot');
const Boom = require('boom');

exports.find = {

  auth: false,

  handler: function (request, reply) {
    Hoot.find({}).exec().then(hoots => {
      reply(hoots);
    }).catch(err => {
      reply(Boom.badImplementation('error accessing db'));
    });
  },

};

exports.findOne = {

  auth: false,

  handler: function (request, reply) {
    Hoot.findOne({ _id: request.params.id }).then(hoot => {
      if (hoot != null) {
        reply(hoot);
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
    const hoot = new Hoot(request.payload);
    hoot.save().then(newHoot => {
      reply(newHoot).code(201);
    }).catch(err => {
      reply(Boom.badImplementation('error creating hoot'));
    });
  },

};

exports.deleteAll = {

  auth: false,

  handler: function (request, reply) {
    Hoot.remove({}).then(err => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.badImplementation('error removing hoots'));
    });
  },

};

exports.deleteOne = {

  auth: false,

  handler: function (request, reply) {
    Hoot.remove({ _id: request.params.id }).then(hoot => {
      reply().code(204);
    }).catch(err => {
      reply(Boom.notFound('id not found'));
    });
  },

};
