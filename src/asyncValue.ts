import isError from 'is-error';
import isPromise from 'is-promise';

import type { AsyncCallback } from './types.ts';

export default function asyncValue(value: unknown, callback: AsyncCallback): undefined | unknown {
  if (isError(value)) return callback(value as Error);
  if (isPromise(value)) {
    return (value as Promise<unknown>)
      .then((result) => {
        callback(undefined, result);
      })
      .catch((err) => {
        callback(err);
      });
  }
  return callback(undefined, value);
}
