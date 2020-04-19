const HAS_ASYNC_AWAIT = typeof Symbol !== 'undefined' && Symbol.asyncIterator;

describe('platform specific', function () {
  if (HAS_ASYNC_AWAIT) require('./asyncAwait');
});
