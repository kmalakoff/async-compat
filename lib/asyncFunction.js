module.exports = function asyncFunction(fn, async /* arguments and callback */) {
  var args = Array.prototype.slice.call(arguments, 2);
  var callback = args[args.length - 1];

  try {
    if (async) fn.apply(null, args);
    else {
      args.pop();
      callback(null, fn.apply(null, args));
    }
  } catch (err) {
    callback(err);
  }
};
