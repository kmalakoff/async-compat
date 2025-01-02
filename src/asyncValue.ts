import isError from 'is-error';
import isPromise from 'is-promise';

export default function asyncValue(value, callback) {
  if (isError(value)) return callback(value);
  if (isPromise(value)) {
    return (value as Promise<unknown>)
      .then((result) => {
        callback(null, result);
      })
      .catch((err) => {
        callback(err);
      });
  }
  return callback(null, value);
}
