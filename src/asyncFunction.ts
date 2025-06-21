import asyncValue from './asyncValue.ts';

import type { AsyncCallback, AsyncCallbackFn0, AsyncCallbackFn1, AsyncCallbackFn2, AsyncCallbackFn3, AsyncCallbackFn4, AsyncCallbackFn5, AsyncCallbackFn6, AsyncFn0, AsyncFn1, AsyncFn2, AsyncFn3, AsyncFn4, AsyncFn5, AsyncFn6, AsyncFunction } from './types.ts';

type Optional = AsyncCallback | unknown;

export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: unknown, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: unknown, arg2: unknown, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: unknown, arg2: unknown, arg3: unknown, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, arg6: unknown, callback: AsyncCallback): undefined;
export default function asyncFunction(fn: AsyncFunction, useCallback: boolean, arg1: Optional, arg2?: Optional, arg3?: Optional, arg4?: Optional, arg5?: Optional, arg6?: Optional, _callback?: Optional): undefined {
  // biome-ignore lint/complexity/noArguments: Apply arguments
  const callback = arguments[arguments.length - 1] as AsyncCallback;
  const wrapper: AsyncCallback = (err?: Error, result?: unknown): undefined => {
    err ? (callback as AsyncCallback)(err) : asyncValue(result, callback as AsyncCallback);
  };
  if (useCallback) {
    // biome-ignore lint/complexity/noArguments: Apply arguments
    switch (arguments.length) {
      case 3:
        (fn as AsyncCallbackFn0)(wrapper);
        return;
      case 4:
        (fn as AsyncCallbackFn1)(arg1, wrapper);
        return;
      case 5:
        (fn as AsyncCallbackFn2)(arg1, arg2, wrapper);
        return;
      case 6:
        (fn as AsyncCallbackFn3)(arg1, arg2, arg3, wrapper);
        return;
      case 7:
        (fn as AsyncCallbackFn4)(arg1, arg2, arg3, arg4, wrapper);
        return;
      case 8:
        (fn as AsyncCallbackFn5)(arg1, arg2, arg3, arg4, arg5, wrapper);
        return;
      case 9:
        (fn as AsyncCallbackFn6)(arg1, arg2, arg3, arg4, arg5, arg6, wrapper);
        return;
      default: {
        // biome-ignore lint/complexity/noArguments: Apply arguments
        const args = Array.prototype.slice.call(arguments, 2);
        args[args.length - 1] = wrapper; // replace callback with wrapper
        fn.apply(null, args);
        return;
      }
    }
  }
  // biome-ignore lint/complexity/noArguments: Apply arguments
  switch (arguments.length) {
    case 3:
      wrapper(null, (fn as AsyncFn0)());
      return;
    case 4:
      wrapper(null, (fn as AsyncFn1)(arg1));
      return;
    case 5:
      wrapper(null, (fn as AsyncFn2)(arg1, arg2));
      return;
    case 6:
      wrapper(null, (fn as AsyncFn3)(arg1, arg2, arg3));
      return;
    case 7:
      wrapper(null, (fn as AsyncFn4)(arg1, arg2, arg3, arg4));
      return;
    case 8:
      wrapper(null, (fn as AsyncFn5)(arg1, arg2, arg3, arg4, arg5));
      return;
    case 9:
      wrapper(null, (fn as AsyncFn6)(arg1, arg2, arg3, arg4, arg5, arg6));
      return;
    default: {
      // biome-ignore lint/complexity/noArguments: Apply arguments
      const args = Array.prototype.slice.call(arguments, 2);
      args.pop(); // remove callback
      wrapper(null, fn.apply(null, args));
      return;
    }
  }
}
