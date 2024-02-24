const assert = require('assert');

const compat = require('../..');

describe('async await', () => {
  it('one argument', (done) => {
    async function testFn(arg1) {
      assert.equal(arg1, 1);
      return true;
    }
    compat.asyncFunction(testFn, false, 1, (err, result) => {
      assert.ok(!err);
      assert.equal(result, true);
      done();
    });
  });
});
