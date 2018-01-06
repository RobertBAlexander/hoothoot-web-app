/**
 * Created by Robert Alexander on 14/10/2017.
 */
const Accounts = require('./app/controllers/accounts');
const Hoots = require('./app/controllers/hoots');
const Assets = require('./app/controllers/assets');
const Administrate = require('./app/controllers/administrate');
const Temporary = require('./app/controllers/temporary')

module.exports = [

/*  {
    method: 'GET', path: '/welcome/{lastName}',
    handler: function (request, reply) {
      reply('Welcome ' + request.params.lastName + '!  Go <a href="/login">here</a> to log in.');
    },
  },*/

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/settings', config: Accounts.viewSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: 'GET', path: '/followuser/{id}', config: Accounts.followuser },
  { method: 'GET', path: '/unfollowuser/{id}', config: Accounts.unfollowuser },

  { method: 'GET', path: '/home', config: Temporary.home },
  { method: 'GET', path: '/report', config: Hoots.report },
  { method: 'GET', path: '/allhootslist', config: Hoots.allhootslist },
  { method: 'GET', path: '/viewotheruser/{id}', config: Hoots.viewotheruser },
  { method: 'GET', path: '/personaltimeline', config: Hoots.personaltimeline },

  { method: 'POST', path: '/hoot', config: Hoots.hoot },
  { method: 'GET', path: '/getPic/{id}', config: Hoots.getPic },
  { method: 'POST', path: '/deletehoot', config: Hoots.deletehoot },
  { method: 'POST', path: '/deleteallhoots', config: Hoots.deleteallhoots },

  { method: 'GET', path: '/adminhome', config: Administrate.adminhome },
  { method: 'GET', path: '/usercreation', config: Administrate.usercreation },
  { method: 'POST', path: '/newuser', config: Administrate.newuser },
  { method: 'GET', path: '/viewuser/{id}', config: Administrate.viewuser },
  { method: 'GET', path: '/deleteuser/{id}', config: Administrate.deleteuser },
  { method: 'POST', path: '/deletelistuserhoot/{id}', config: Administrate.deletelistuserhoot },

  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,
  },

];
