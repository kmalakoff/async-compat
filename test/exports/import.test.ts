import assert from 'assert';
import asyncCompat, { asyncFunction, asyncValue, defaultValue } from 'async-compat';

describe('exports .ts', () => {
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
