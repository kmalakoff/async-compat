const assert = require('assert');

const compat = require('../..');

describe('async await', () => {
  (() => {
    // patch and restore promise
    const root = typeof global !== 'undefined' ? global : window;
    let rootPromise;
    before(() => {
      rootPromise = root.Promise;
      root.Promise = require('pinkie-promise');
    });
    after(() => {
      root.Promise = rootPromise;
    });
  })();

  it('one argument', (done) => {
    async function testFn(arg1) {
      assert.equal(arg1, 1);
      return true;
    }
    compat.asyncFunction(testFn, false, 1, (err, result) => {
      assert.ok(!err, err ? err.message : '');
      assert.equal(result, true);
      done();
    });
  });
});
