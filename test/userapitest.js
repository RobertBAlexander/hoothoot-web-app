'use strict';

const assert = require('chai').assert;
var request = require('sync-request');
const HootService = require('./hoot-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('User API tests', function () {

    const url = 'http://localhost:4000';
    var res = request('GET', url);
    let users = fixtures.users;
    let newUser = fixtures.newUser;
    //const users = JSON.parse(res.getBody('utf8'));
    const hootService = new HootService(fixtures.hootService);

    beforeEach(function () {
      hootService.deleteAllUsers();
    });

    afterEach(function () {
      hootService.deleteAllUsers();
    });

    test('get users', function () {
      assert.equal(3, users.length);

      assert.equal(users[0].firstName, 'Homer');
      assert.equal(users[0].lastName, 'Simpson');
      assert.equal(users[0].email, 'homer@simpson.com');
      assert.equal(users[0].password, 'secret');

      assert.equal(users[1].firstName, 'Marge');
      assert.equal(users[1].lastName, 'Simpson');
      assert.equal(users[1].email, 'marge@simpson.com');
      assert.equal(users[1].password, 'secret');

      assert.equal(users[2].firstName, 'Lisa');
      assert.equal(users[2].lastName, 'Simpson');
      assert.equal(users[2].email, 'lisa@simpson.com');
      assert.equal(users[2].password, 'secret');

    });

    test('Create a user', function () {
      const returnedUser = hootService.createUser(newUser);
      assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
      assert.isDefined(returnedUser._id);
    });

    test('Get user', function () {
      const u1 = hootService.createUser(newUser);
      const u2 = hootService.getUser(u1._id);
      assert.deepEqual(u1, u2);
    });

    test('Get invalid user', function () {
      const u1 = hootService.getUser('1234');
      assert.isNull(u1);
      const u2 = hootService.getUser('012345678df1234567820123');
      assert.isNull(u2);
    });

    test('Delete a user', function () {
      const u = hootService.createUser(newUser);
      assert(hootService.getUser(u._id) != null);
      hootService.deleteOneUser(u._id);
      assert(hootService.getUser(u._id) == null);
    });

    test('Get all users', function () {
      for (let u of users) {
        hootService.createUser(u);
      }

      const allUsers = hootService.getUsers();
      assert.equal(allUsers.length, users.length);
    });

    test('Get users detail', function () {
      for (let u of users) {
        hootService.createUser(u);
      }

      const allUsers = hootService.getUsers();
      for (let i = 0; i < users.length; i++) {
        assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
      }
    });

    test('Get all users empty', function () {
      const allUsers = hootService.getUsers();
      assert.equal(allUsers.length, 0);
    });

    /*    test('get one user', function () {

          const allUsersUrl = 'http://localhost:4000';
          var res = request('GET', allUsersUrl);
          const users = JSON.parse(res.getBody('utf8'));

          const oneUserUrl = allUsersUrl + '/' + users[1]._id;
          res = request('GET', oneUserUrl);
          const oneUser = JSON.parse(res.getBody('utf8'));

          assert.equal(oneUser.firstName, 'Marge');
          assert.equal(oneUser.lastName, 'Simpson');
          assert.equal(oneUser.email, 'marge@simpson.com');
          assert.equal(oneUser.password, 'secret');

        });*/
  });
