var assert = require('assert');

var compatability = require('../..');

var defaultValue = compatability.defaultValue;

describe('defaultValue', function () {
  it('not replace defined value', function () {
    assert.equal(defaultValue(1, 2), 1);
  });

  it('should replace undefined value', function () {
    assert.equal(defaultValue(undefined, 2), 2);
  });
});
