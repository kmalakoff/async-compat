var assert = require('assert');

var compatability = require('../..');

var asyncFunction = compatability.asyncFunction;

describe('asyncFunction', function () {
  describe('asynchronous function', function () {
    it('all parameters', function (done) {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        callback(null, 4);
      }

      asyncFunction(fn, true, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 4);
        done();
      });
    });

    it('error returned', function (done) {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        callback(new Error('Failed'));
      }

      asyncFunction(fn, true, 1, 2, 3, function (err, result) {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });

    it('error thrown', function (done) {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        throw new Error('Failed');
      }

      try {
        asyncFunction(fn, true, 1, 2, 3, function (err, result) {
          assert.ok(!err);
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
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return 4;
      }

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 4);
        done();
      });
    });

    it('all parameters (promise)', function (done) {
      if (typeof Promise === 'undefined') return done(); // no promise support

      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return Promise.resolve(4);
      }

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 4);
        done();
      });
    });

    it('error returned', function (done) {
      if (typeof Promise === 'undefined') return done(); // no promise support

      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return new Promise(function (resolve, reject) {
          reject(new Error('Failed'));
        });
      }

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });

    it('error thrown', function (done) {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        throw new Error('Failed');
      }

      try {
        asyncFunction(fn, true, 1, 2, 3, function (err, result) {
          assert.ok(!err);
          assert.ok(false);
        });
      } catch (err) {
        assert.ok(!!err);
        done();
      }
    });

    it('error returned (no callback)', function (done) {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!callback);
        return new Error('Failed');
      }

      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });
  });

  describe('arguments (sync)', function () {
    var args = [];

    function fn() {
      args.push(Array.prototype.slice.call(arguments, 0));
      return 1;
    }

    it('0 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, []);
        });
        done();
      });
    });

    it('1 argument', function (done) {
      args = [];
      asyncFunction(fn, false, 1, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1]);
        });
        done();
      });
    });

    it('2 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2]);
        });
        done();
      });
    });

    it('3 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3]);
        });
        done();
      });
    });

    it('4 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 4, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 4]);
        });
        done();
      });
    });

    it('5 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5]);
        });
        done();
      });
    });

    it('6 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6]);
        });
        done();
      });
    });

    it('7 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, 7, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6, 7]);
        });
        done();
      });
    });
  });

  describe('arguments (callback)', function () {
    var args = [];

    function fn() {
      args.push(Array.prototype.slice.call(arguments, 0));
      args[args.length - 1].pop()(null, 1);
    }

    it('0 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, []);
        });
        done();
      });
    });

    it('1 argument', function (done) {
      args = [];
      asyncFunction(fn, true, 1, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1]);
        });
        done();
      });
    });

    it('2 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, 1, 2, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2]);
        });
        done();
      });
    });

    it('3 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3]);
        });
        done();
      });
    });

    it('4 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 4, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 4]);
        });
        done();
      });
    });

    it('5 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 3, 4, 5, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5]);
        });
        done();
      });
    });

    it('6 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 3, 4, 5, 6, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6]);
        });
        done();
      });
    });

    it('7 arguments', function (done) {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 3, 4, 5, 6, 7, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6, 7]);
        });
        done();
      });
    });
  });

  describe('arguments (promise)', function () {
    if (typeof Promise === 'undefined') return; // no promise support
    var args = [];

    function fn() {
      args.push(Array.prototype.slice.call(arguments, 0));
      return Promise.resolve(1);
    }

    it('0 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, []);
        });
        done();
      });
    });

    it('1 argument', function (done) {
      args = [];
      asyncFunction(fn, false, 1, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1]);
        });
        done();
      });
    });

    it('2 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2]);
        });
        done();
      });
    });

    it('3 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3]);
        });
        done();
      });
    });

    it('4 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 4, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 4]);
        });
        done();
      });
    });

    it('5 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5]);
        });
        done();
      });
    });

    it('6 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6]);
        });
        done();
      });
    });

    it('7 arguments', function (done) {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, 7, function (err, result) {
        assert.ok(!err);
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach(function (params) {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6, 7]);
        });
        done();
      });
    });
  });
});
