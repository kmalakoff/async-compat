var assert = require('assert');

var compatability = require('../..');

var asyncFunction = compatability.asyncFunction;

describe('asyncFunction', function () {
  describe('asynchronous function', function () {
    it('all parameters', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        callback(null, 4);
      };

      asyncFunction(fn, true, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 4);
        done();
      });
    });

    it('error returned', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        callback(new Error('Failed'));
      };

      asyncFunction(fn, true, 1, 2, 3, function (err, result) {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });

    it('error thrown', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        throw new Error('Failed');
      };

      try {
        asyncFunction(fn, true, 1, 2, 3, function (err, result) {
          assert.ok(false);
        });
      } catch (err) {
        assert.ok(!!err);
        done();
      }
    });
  });

  describe('synchronous function', function () {
    it('all parameters', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return 4;
      };

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 4);
        done();
      });
    });

    it('all parameters (promise)', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return Promise.resolve(4);
      };

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 4);
        done();
      });
    });

    it('error returned', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return new Promise(function (resolve, reject) {
          reject(new Error('Failed'));
        });
      };

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });

    it('error thrown', function (done) {
      var fn = function (value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        throw new Error('Failed');
      };

      try {
        asyncFunction(fn, true, 1, 2, 3, function (err, result) {
          assert.ok(false);
        });
      } catch (err) {
        assert.ok(!!err);
        done();
      }
    });
  });
});
