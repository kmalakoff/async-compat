var BenchmarkSuite = require('benchmark-suite');

module.exports = async function run({ compat, version }) {
  var suite = new BenchmarkSuite('compat ' + version, 'Operations');

  function testFn(fn) {
    return function () {
      fn();
      arguments[arguments.length - 1](null, true);
    };
  }

  function asyncTestFn(fn) {
    return async function () {
      fn();
      return true;
    };
  }

  suite.add(`callback-0`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`callback-1`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, 1, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`callback-2`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, 1, 2, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`callback-3`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, 1, 2, 3, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`callback-4`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, 1, 2, 3, 4, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`callback-5`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, 1, 2, 3, 4, 5, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`callback-6`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(testFn(fn), true, 1, 2, 3, 4, 5, 6, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });

  suite.add(`promise-0`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });

  suite.add(`promise-1`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, 1, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });

  suite.add(`promise-2`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, 1, 2, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`promise-3`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, 1, 2, 3, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`promise-4`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, 1, 2, 3, 4, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`promise-5`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, 1, 2, 3, 4, 5, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });
  suite.add(`promise-6`, function (fn) {
    return new Promise(function (resolve, reject) {
      compat.asyncFunction(asyncTestFn(fn), false, 1, 2, 3, 4, 5, 6, function (err) {
        err ? reject(err) : resolve();
      });
    });
  });

  suite.on('cycle', (results) => {
    for (var key in results) console.log(`${results[key].name.padStart(8, ' ')}| ${suite.formatStats(results[key].stats)}`);
  });
  suite.on('complete', function (results) {
    console.log('-----Fastest-----');
    for (var key in results) console.log(`${results[key].name.padStart(8, ' ')}| ${suite.formatStats(results[key].stats)}`);
  });

  console.log('----------' + suite.name + '----------');
  await suite.run({ time: 1000 });
  console.log('');
};
