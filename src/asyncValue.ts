import isError from 'is-error';
import isPromise from 'is-promise';

import type { AsyncCallback } from './types.js';

export default function asyncValue(value: unknown, callback: AsyncCallback): undefined | unknown {
  if (isError(value)) return callback(value as Error);
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
