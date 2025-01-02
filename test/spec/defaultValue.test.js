const assert = require('assert');

const compatability = require('../..');

const defaultValue = compatability.defaultValue;

describe('defaultValue', () => {
  it('not replace defined value', () => {
    assert.equal(defaultValue(1, 2), 1);
  });

  it('should replace undefined value', () => {
    assert.equal(defaultValue(undefined, 2), 2);
  });
});
