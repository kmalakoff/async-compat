const assert = require('assert');

const compatability = require('../..');

const asyncValue = compatability.asyncValue;

describe('asyncValue', () => {
  it('should resolve a promise', (done) => {
    if (typeof Promise === 'undefined') return done(); // no promise support

    asyncValue(Promise.resolve(1), (err, value) => {
      assert.ok(!err, err ? err.message : '');
      assert.equal(value, 1);
      done();
    });
  });
  it('should return a value', (done) => {
    asyncValue(1, (err, value) => {
      assert.ok(!err, err ? err.message : '');
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
