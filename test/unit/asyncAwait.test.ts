import assert from 'assert';
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
    async function testFn(arg1: unknown) {
      assert.equal(arg1, 1);
      return true;
    }
    compat.asyncFunction(testFn, false, 1, (err?: Error, result?: unknown) => {
      if (err) return done(err);
      assert.equal(result, true);
      done();
    });
  });
});
