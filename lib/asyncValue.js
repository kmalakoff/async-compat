var isPromise = require('is-promise');

module.exports = function asyncValue(value, callback) {
  isPromise(value)
    ? value
        .then(function (result) {
          callback(null, result);
        })
        .catch(function (err) {
          callback(err);
        })
    : callback(null, value);
};
