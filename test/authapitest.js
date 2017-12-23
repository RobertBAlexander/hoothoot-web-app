'use strict';

const assert = require('chai').assert;
const HootService = require('./hoot-service');
const fixtures = require('./fixtures.json');
const utils = require('../app/api/utils.js');

suite('Auth API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;
  let hoots = fixtures.hoots;

  const hootService = new HootService(fixtures.hootService);

  beforeEach(function () {
    hootService.deleteAllUsers();
  });

  afterEach(function () {
    hootService.deleteAllUsers();
  });

  test('authenticate', function () {
    const returnedUser = hootService.createUser(newUser);
    const response = hootService.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test('verify Token', function () {
    const returnedUser = hootService.createUser(newUser);
    const response = hootService.authenticate(newUser);

    const userInfo = utils.decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
