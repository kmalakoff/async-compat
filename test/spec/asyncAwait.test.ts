import assert from 'assert';
// @ts-ignore
import compat from 'async-compat';
import Pinkie from 'pinkie-promise';

describe('async await', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();

  it('one argument', (done) => {
    async function testFn(arg1) {
      assert.equal(arg1, 1);
      return true;
    }
    compat.asyncFunction(testFn, false, 1, (err, result) => {
      if (err) return done(err.message);
      assert.equal(result, true);
      done();
    });
  });
});
