'use strict';

const SyncHttpService = require('./sync-http-service');
const baseUrl = 'https://localhost:4000';

class HootService {

  constructor(baseUrl) {
    this.httpService = new SyncHttpService(baseUrl);
  }

  getHoots() {
    return this.httpService.get('/api/hoots');
  }

  getHoot(id) {
    return this.httpService.get('/api/hoots/' + id);
  }

  createHoot(newHoot) {
    return this.httpService.post('/api/hoots', newHoot);
  }

  deleteOneHoot(id) {
    return this.httpService.delete('/api/hoots/' + id);
  }

  deleteAllHoots() {
    return this.httpService.delete('/api/hoots');
  }

  getUsers() {
    return this.httpService.get('/api/users');
  }

  getUser(id) {
    return this.httpService.get('/api/users/' + id);
  }

  createUser(newUser) {
    return this.httpService.post('/api/users', newUser);
  }

  deleteAllUsers() {
    return this.httpService.delete('/api/users');
  }

  deleteOneUser(id) {
    return this.httpService.delete('/api/users/' + id);
  }

}

module.exports = HootService;
