'use strict';

const assert = require('chai').assert;
const HootService = require('./hoot-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Hoot API tests', function () {

  let hoots = fixtures.hoots;
  let newHoot = fixtures.newHoot;
  let users = fixtures.users;

  const hootService = new HootService(fixtures.hootService);

  beforeEach(function () {
    hootService.deleteAllHoots();
  });

  afterEach(function () {
    hootService.deleteAllHoots();
  });

  test('create a Hoot', function () {
    const returnedHoot = hootService.createHoot(newHoot);
    assert(_.some([returnedHoot], newHoot), 'returned Hoot must be a superset of new Hoot');
    assert.isDefined(returnedHoot._id);
  });

  test('get hoot', function () {
    const t1 = hootService.createHoot(newHoot);
    const t2 = hootService.getHoot(t1._id);
    assert.deepEqual(t1, t2);
  });

  test('Get invalid hoot', function () {
    const t1 = hootService.getHoot('123dfgdfgdfdfg4');
    assert.isNull(t1);
    const t2 = hootService.getHoot('01234567dfgfdg567890123');
    assert.isNull(t2);
  });
  test('delete a Hoot', function () {
    const t = hootService.createHoot(newHoot);
    assert(hootService.getHoot(t._id) != null);
    hootService.deleteOneHoot(t._id);
    //console.log(hootService.getHoot(t._id).toString());
    //assert(hootService.getHoot(t._id) == 'id not found');
  });

  test('get all Hoots', function () {
    for (let t of hoots) {
      hootService.createHoot(t);
    }

    const allHoots = hootService.getHoots();
    assert.equal(allHoots.length, hoots.length);
  });

  test('get Hoots detail', function () {
    for (let t of hoots) {
      hootService.createHoot(t);
    }

    const allHoots = hootService.getHoots();
    for (let i = 0; i < hoots.length; i++) {
      assert(_.some([allHoots[i]], hoots[i]), 'returned Hoot must be a superset of new Hoot');
    }
  });

  test('get all Hoots empty', function () {
    const allHoots = hootService.getHoots();
    assert.equal(allHoots.length, 0);
  });
});
