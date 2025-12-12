import assert from 'assert';
import { asyncValue } from 'async-compat';
import Pinkie from 'pinkie-promise';

describe('asyncValue', () => {
  it('should resolve a promise', (done) => {
    asyncValue(Pinkie.resolve(1), (err, value) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal(value, 1);
      done();
    });
  });
  it('should return a value', (done) => {
    asyncValue(1, (err, value) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal(value, 1);
      done();
    });
  });
  it('should return an error', (done) => {
    asyncValue(new Error('Failed'), (err, value) => {
      assert.ok(!!err);
      assert.equal(value, undefined);
      done();
    });
  });
});
