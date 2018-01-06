/**
 * Created by Robert Alexander on 31/10/2017.
 */
const HootsApi = require('./app/api/hootsapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [
  { method: 'GET', path: '/api/users', config: UsersApi.find },
  { method: 'GET', path: '/api/users/{id}', config: UsersApi.findOne },
  { method: 'POST', path: '/api/users', config: UsersApi.create },
  { method: 'GET', path: '/api/users/{id}/followed', config: HootsApi.getFollowedHoots },
  { method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne },
  { method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll },
  { method: 'POST', path: '/api/users/{id}/follow', config: UsersApi.follow },
  { method: 'POST', path: '/api/users/{id}/unfollow', config: UsersApi.unfollow },

  { method: 'PUT', path: '/api/users', config: UsersApi.update },
  { method: 'POST', path: '/api/users/authenticate', config: UsersApi.authenticate },

  { method: 'GET', path: '/api/hoots', config: HootsApi.find },
  { method: 'GET', path: '/api/hoots/{id}', config: HootsApi.findOne },
  { method: 'POST', path: '/api/hoots', config: HootsApi.create },
  { method: 'DELETE', path: '/api/hoots/{id}', config: HootsApi.deleteOne },
  { method: 'DELETE', path: '/api/hoots', config: HootsApi.deleteAll },
];
