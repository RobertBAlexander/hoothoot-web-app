/**
 * Created by Robert Alexander on 14/10/2017.
 */
const Hoots = require('./app/controllers/hoots');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Hoots.home },
  { method: 'GET', path: '/signup', config: Hoots.signup },
  { method: 'GET', path: '/login', config: Hoots.login },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];