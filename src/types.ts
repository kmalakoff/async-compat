export type AsyncCallback = (err?: Error, result?: unknown) => void;

export type AsyncCallbackFn0 = (callback: AsyncCallback) => unknown;
export type AsyncCallbackFn1 = (arg1: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn2 = (arg1: unknown, arg2: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn3 = (arg1: unknown, arg2: unknown, arg3: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn4 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn5 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, callback: AsyncCallback) => unknown;
export type AsyncCallbackFn6 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, arg6: unknown, callback: AsyncCallback) => unknown;

export type AsyncFn0 = () => unknown | Promise<unknown>;
export type AsyncFn1 = (arg1: unknown) => unknown | Promise<unknown>;
export type AsyncFn2 = (arg1: unknown, arg2: unknown) => unknown | Promise<unknown>;
export type AsyncFn3 = (arg1: unknown, arg2: unknown, arg3: unknown) => unknown | Promise<unknown>;
export type AsyncFn4 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown) => unknown | Promise<unknown>;
export type AsyncFn5 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown) => unknown | Promise<unknown>;
export type AsyncFn6 = (arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown, arg5: unknown, arg6: unknown) => unknown | Promise<unknown>;

export type AsyncFunction = AsyncCallbackFn0 | AsyncCallbackFn1 | AsyncCallbackFn2 | AsyncCallbackFn3 | AsyncCallbackFn4 | AsyncCallbackFn5 | AsyncCallbackFn6 | AsyncFn0 | AsyncFn1 | AsyncFn2 | AsyncFn3 | AsyncFn4 | AsyncFn5 | AsyncFn6;
