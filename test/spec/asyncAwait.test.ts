import assert from 'assert';
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Promise from 'pinkie-promise';

// @ts-ignore
import compat from 'async-compat';

describe('async await', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      global.Promise = Promise;
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();

  it('one argument', (done) => {
    async function testFn(arg1) {
      assert.equal(arg1, 1);
      return true;
    }
    compat.asyncFunction(testFn, false, 1, (err, result) => {
      if (err) return done(err);
      assert.equal(result, true);
      done();
    });
  });
});
