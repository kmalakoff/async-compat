"use strict";
var isError = require("is-error");
var isPromise = require("is-promise");
module.exports = function asyncValue(value, callback) {
    if (isError(value)) return callback(value);
    if (isPromise(value)) {
        return value.then(function(result) {
            callback(null, result);
        }).catch(function(err) {
            callback(err);
        });
    }
    return callback(null, value);
};
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }