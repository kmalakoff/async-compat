const HAS_ASYNC_AWAIT = typeof Symbol !== 'undefined' && Symbol.asyncIterator;

!HAS_ASYNC_AWAIT || require('./asyncAwait');
