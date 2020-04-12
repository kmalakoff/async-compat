var assert = require('assert');

var compatability = require('../..');

var asyncValue = compatability.asyncValue;

describe('asyncValue', function () {
  it('should resolve a promise', function (done) {
    asyncValue(Promise.resolve(1), function (err, value) {
      assert.ok(!err);
      assert.equal(value, 1);
      done();
    });
  });
  it('should return a value', function (done) {
    asyncValue(1, function (err, value) {
      assert.ok(!err);
      assert.equal(value, 1);
      done();
    });
  });
});
