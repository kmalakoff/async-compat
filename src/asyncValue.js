const isError = require('is-error');
const isPromise = require('is-promise');

module.exports = function asyncValue(value, callback) {
  if (isError(value)) return callback(value);
  if (isPromise(value)) {
    return value
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        callback(err);
      });
  }
  return callback(null, value);
};
