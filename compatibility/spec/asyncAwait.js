var assert = require('assert');

var compat = require('../..');

describe('async await', function () {
  it('one argument', function (done) {
    async function testFn(arg1) {
      assert.equal(arg1, 1);
      return true;
    }
    compat.asyncFunction(testFn, false, 1, function (err, result) {
      assert.ok(!err);
      assert.equal(result, true);
      done();
    });
  });
});
