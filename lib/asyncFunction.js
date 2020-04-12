var asyncValue = require('./asyncValue');

module.exports = function asyncFunction(fn, async /* arguments and callback */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var callback = args.pop();

  function wrapper(err, result) {
    err ? callback(err) : asyncValue(result, callback);
  }

  if (async) {
    args.push(wrapper);
    fn.apply(null, args);
  } else wrapper(null, fn.apply(null, args));
};
