'use strict';

const assert = require('chai').assert;
var request = require('sync-request');

suite('User API tests', function () {

  test('get users', function () {

    const url = 'http://localhost:4000';
    var res = request('GET', url);
    const users = JSON.parse(res.getBody('utf8'));
    assert.equal(3, users.length);

    assert.equal(users[0].firstName, 'Homer');
    assert.equal(users[0].lastName, 'Simpson');
    assert.equal(users[0].email, 'homer@simpson.com');
    assert.equal(users[0].password, 'secret');

    assert.equal(users[1].firstName, 'Marge');
    assert.equal(users[1].lastName, 'Simpson');
    assert.equal(users[1].email, 'marge@simpson.com');
    assert.equal(users[1].password, 'secret');

    assert.equal(users[2].firstName, 'Bart');
    assert.equal(users[2].lastName, 'Simpson');
    assert.equal(users[2].email, 'bart@simpson.com');
    assert.equal(users[2].password, 'secret');

  });

  test('get one user', function () {

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

  });
});
