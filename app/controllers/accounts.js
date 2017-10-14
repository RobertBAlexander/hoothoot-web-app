/**
 * Created by Robert Alexander on 14/10/2017.
 */
'use strict';

exports.main = {

  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Hoot Hoot' });
  },

};

exports.signup = {

  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Hoot Hoot' });
  },

};

exports.register = {

  handler: function (request, reply) {
    const data = request.payload;
    this.users.push(data);
    reply.redirect('/home');
  },

};

exports.login = {

  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Hoot' });
  },

};

exports.authenticate = {

  handler: function (request, reply) {
    reply.redirect('/home');
  },

};

exports.logout = {

  handler: function (request, reply) {
    reply.redirect('/');
  },

};