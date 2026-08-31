const assert = require('assert');
const { default: asyncCompat, asyncFunction, asyncValue, defaultValue } = require('async-compat');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof asyncCompat, 'object');
  });
  it('asyncFunction', () => {
    assert.equal(typeof asyncFunction, 'function');
  });
  it('asyncValue', () => {
    assert.equal(typeof asyncValue, 'function');
  });
  it('defaultValue', () => {
    assert.equal(typeof defaultValue, 'function');
  });
});
