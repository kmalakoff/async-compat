# async-compat

Convert synchronous, callback, and promise-returning functions to a callback interface.

## Install

```bash
npm install async-compat
```

## Usage

`asyncFunction(fn, hasCallback, ...args, callback)` invokes `fn` and calls the final callback with `(err, result)`. Set `hasCallback` to `true` when `fn` expects a callback.

```js
var compat = require('async-compat');

function syncFn(value) {
  return value * 2;
}

compat.asyncFunction(syncFn, false, 2, function (err, result) {
  if (err) throw err;
  console.log(result); // 4
});

function callbackFn(value, callback) {
  callback(null, value * 2);
}

compat.asyncFunction(callbackFn, true, 2, function (err, result) {
  if (err) throw err;
  console.log(result); // 4
});

function promiseFn(value) {
  return Promise.resolve(value * 2);
}

compat.asyncFunction(promiseFn, false, 2, function (err, result) {
  if (err) throw err;
  console.log(result); // 4
});
```

## API

- `asyncFunction(fn, hasCallback, ...args, callback)` normalizes a synchronous, callback-based, or promise-returning function. Returned `Error` values and rejected promises reach the callback as `err`.
- `asyncValue(value, callback)` sends an `Error`, resolved promise value, or ordinary value to the callback.
- `defaultValue(result, value)` returns `value` only when `result` is `undefined`; otherwise it returns `result`.
