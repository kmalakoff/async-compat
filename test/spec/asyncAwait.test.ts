import assert from 'assert';
// @ts-ignore
import compat from 'async-compat';
import Pinkie from 'pinkie-promise';

describe('async await', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      global.Promise = Pinkie;
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
      if (err) return done(err.message);
      assert.equal(result, true);
      done();
    });
  });
});
