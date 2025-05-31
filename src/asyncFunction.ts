import asyncValue from './asyncValue.js';

import type { AsyncCallback, AsyncCallbackFn0, AsyncCallbackFn1, AsyncCallbackFn2, AsyncCallbackFn3, AsyncCallbackFn4, AsyncCallbackFn5, AsyncCallbackFn6, AsyncFunction, AsyncPromiseFn0, AsyncPromiseFn1, AsyncPromiseFn2, AsyncPromiseFn3, AsyncPromiseFn4, AsyncPromiseFn5, AsyncPromiseFn6 } from './types.js';
type Optional = AsyncCallback | undefined | unknown;

export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1?: Optional, arg2?: Optional, arg3?: Optional, arg4?: Optional, arg5?: Optional, arg6?: Optional, callback?: Optional): undefined | unknown {
  const wrapper: AsyncCallback = (err?: Error, result?: unknown) => {
    err ? (callback as AsyncCallback)(err) : asyncValue(result, callback as AsyncCallback);
  };
  if (useCallback) {
    // biome-ignore lint/style/noArguments: <explanation>
    switch (arguments.length) {
      case 3:
        callback = arg1;
        return (fn as AsyncCallbackFn0)(wrapper);
      case 4:
        callback = arg2;
        return (fn as AsyncCallbackFn1)(arg1, wrapper);
      case 5:
        callback = arg3;
        return (fn as AsyncCallbackFn2)(arg1, arg2, wrapper);
      case 6:
        callback = arg4;
        return (fn as AsyncCallbackFn3)(arg1, arg2, arg3, wrapper);
      case 7:
        callback = arg5;
        return (fn as AsyncCallbackFn4)(arg1, arg2, arg3, arg4, wrapper);
      case 8:
        callback = arg6;
        return (fn as AsyncCallbackFn5)(arg1, arg2, arg3, arg4, arg5, wrapper);
      case 9:
        return (fn as AsyncCallbackFn6)(arg1, arg2, arg3, arg4, arg5, arg6, wrapper);
      default: {
        // biome-ignore lint/style/noArguments: <explanation>
        const args = Array.prototype.slice.call(arguments, 2);
        callback = args.pop();
        args.push(wrapper);
        return fn.apply(null, args);
      }
    }
  }
  // biome-ignore lint/style/noArguments: <explanation>
  switch (arguments.length) {
    case 3:
      callback = arg1;
      return wrapper(null, (fn as AsyncPromiseFn0)());
    case 4:
      callback = arg2;
      return wrapper(null, (fn as AsyncPromiseFn1)(arg1));
    case 5:
      callback = arg3;
      return wrapper(null, (fn as AsyncPromiseFn2)(arg1, arg2));
    case 6:
      callback = arg4;
      return wrapper(null, (fn as AsyncPromiseFn3)(arg1, arg2, arg3));
    case 7:
      callback = arg5;
      return wrapper(null, (fn as AsyncPromiseFn4)(arg1, arg2, arg3, arg4));
    case 8:
      callback = arg6;
      return wrapper(null, (fn as AsyncPromiseFn5)(arg1, arg2, arg3, arg4, arg5));
    case 9:
      return wrapper(null, (fn as AsyncPromiseFn6)(arg1, arg2, arg3, arg4, arg5, arg6));
    default: {
      // biome-ignore lint/style/noArguments: <explanation>
      const args1 = Array.prototype.slice.call(arguments, 2);
      callback = args1.pop();
      return wrapper(null, fn.apply(null, args1));
    }
  }
}
