import assert from 'assert';
import { asyncFunction } from 'async-compat';
import Pinkie from 'pinkie-promise';

describe('asyncFunction', () => {
  describe('asynchronous function', () => {
    it('all parameters', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        callback(null, 4);
      }

      asyncFunction(fn, true, 1, 2, 3, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 4);
        done();
      });
    });

    it('error returned', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        callback(new Error('Failed'));
      }

      asyncFunction(fn, true, 1, 2, 3, (err?: Error, result?: unknown) => {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });

    it('error thrown', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!!callback);
        throw new Error('Failed');
      }

      try {
        asyncFunction(fn, true, 1, 2, 3, (err, _result) => {
          assert.ok(!!err);
        });
      } catch (_err) {
        assert.ok(true);
        done();
      }
    });
  });

  describe('synchronous function', () => {
    it('all parameters', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return 4;
      }

      asyncFunction(fn, false, 1, 2, 3, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 4);
        done();
      });
    });

    it('all parameters (promise)', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return Pinkie.resolve(4);
      }

      asyncFunction(fn, false, 1, 2, 3, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 4);
        done();
      });
    });

    it('error returned', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        return new Pinkie((_resolve, reject) => {
          reject(new Error('Failed'));
        });
      }

      asyncFunction(fn, false, 1, 2, 3, (err?: Error, result?: unknown) => {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });

    it('error thrown', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.equal(callback, undefined);
        throw new Error('Failed');
      }

      try {
        asyncFunction(fn, true, 1, 2, 3, (err, _result) => {
          if (err) {
            done(err);
            return;
          }
          assert.ok(false);
        });
      } catch (err) {
        assert.ok(!!err);
        done();
      }
    });

    it('error returned (no callback)', (done) => {
      function fn(value1, value2, value3, callback) {
        assert.equal(value1, 1);
        assert.equal(value2, 2);
        assert.equal(value3, 3);
        assert.ok(!callback);
        return new Error('Failed');
      }

      asyncFunction(fn, false, 1, 2, 3, (err?: Error, result?: unknown) => {
        assert.ok(!!err);
        assert.equal(result, undefined);
        done();
      });
    });
  });

  describe('arguments (sync)', () => {
    let args = [];

    function fn() {
      // biome-ignore lint/complexity/noArguments: Apply arguments
      args.push(Array.prototype.slice.call(arguments, 0));
      return 1;
    }

    it('0 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, []);
        });
        done();
      });
    });

    it('1 argument', (done) => {
      args = [];
      asyncFunction(fn, false, 1, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1]);
        });
        done();
      });
    });

    it('2 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2]);
        });
        done();
      });
    });

    it('3 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3]);
        });
        done();
      });
    });

    it('4 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 4, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 4]);
        });
        done();
      });
    });

    it('5 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5]);
        });
        done();
      });
    });

    it('6 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6]);
        });
        done();
      });
    });

    it('7 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, 7, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6, 7]);
        });
        done();
      });
    });
  });

  describe('arguments (callback)', () => {
    let args = [];

    function fn() {
      // biome-ignore lint/complexity/noArguments: Apply arguments
      args.push(Array.prototype.slice.call(arguments, 0));
      args[args.length - 1].pop()(null, 1);
    }

    it('0 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, []);
        });
        done();
      });
    });

    it('1 argument', (done) => {
      args = [];
      asyncFunction(fn, true, 1, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1]);
        });
        done();
      });
    });

    it('2 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, 1, 2, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2]);
        });
        done();
      });
    });

    it('3 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3]);
        });
        done();
      });
    });

    it('4 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 4, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 4]);
        });
        done();
      });
    });

    it('5 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 3, 4, 5, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5]);
        });
        done();
      });
    });

    it('6 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 3, 4, 5, 6, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6]);
        });
        done();
      });
    });

    it('7 arguments', (done) => {
      args = [];
      asyncFunction(fn, true, 1, 2, 3, 3, 4, 5, 6, 7, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6, 7]);
        });
        done();
      });
    });
  });

  describe('arguments (promise)', () => {
    let args = [];

    function fn() {
      // biome-ignore lint/complexity/noArguments: Apply arguments
      args.push(Array.prototype.slice.call(arguments, 0));
      return Pinkie.resolve(1);
    }

    it('0 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, []);
        });
        done();
      });
    });

    it('1 argument', (done) => {
      args = [];
      asyncFunction(fn, false, 1, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1]);
        });
        done();
      });
    });

    it('2 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2]);
        });
        done();
      });
    });

    it('3 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3]);
        });
        done();
      });
    });

    it('4 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 4, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 4]);
        });
        done();
      });
    });

    it('5 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5]);
        });
        done();
      });
    });

    it('6 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6]);
        });
        done();
      });
    });

    it('7 arguments', (done) => {
      args = [];
      asyncFunction(fn, false, 1, 2, 3, 3, 4, 5, 6, 7, (err?: Error, result?: unknown) => {
        if (err) {
          done(err);
          return;
        }
        assert.equal(result, 1);
        assert.equal(args.length, 1);
        args.forEach((params) => {
          assert.deepEqual(params, [1, 2, 3, 3, 4, 5, 6, 7]);
        });
        done();
      });
    });
  });
});
