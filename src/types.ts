export type AsyncCallback = (err?: Error, result?: unknown) => void;

export type AsyncCallbackFn0 = (callback: AsyncCallback) => unknown;
export type AsyncCallbackFn1 = (arg1: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn2 = (arg1: unknown, arg2: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn3 = (arg1: unknown, arg2: unknown, arg3: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn4 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn5 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn6 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, arg6: unknown, callback: AsyncCallback) => unknown;

export type AsyncPromiseFn0 = () => Promise<unknown>;
export type AsyncPromiseFn1 = (arg1: unknown) => Promise<unknown>;
export type AsyncPromiseFn2 = (arg1: unknown, arg2: unknown) => Promise<unknown>;
export type AsyncPromiseFn3 = (arg1: unknown, arg2: unknown, arg3: unknown) => Promise<unknown>;
export type AsyncPromiseFn4 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown) => Promise<unknown>;
export type AsyncPromiseFn5 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown) => Promise<unknown>;
export type AsyncPromiseFn6 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, arg6: unknown) => Promise<unknown>;

export type AsyncFunction = AsyncCallbackFn0 | AsyncCallbackFn1 | AsyncCallbackFn2 | AsyncCallbackFn3 | AsyncCallbackFn4 | AsyncCallbackFn5 | AsyncCallbackFn6 | AsyncPromiseFn0 | AsyncPromiseFn1 | AsyncPromiseFn2 | AsyncPromiseFn3 | AsyncPromiseFn4 | AsyncPromiseFn5 | AsyncPromiseFn6;
