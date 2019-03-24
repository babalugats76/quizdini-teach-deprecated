import API from './api'; // Base axios instance for server interactions

/**
 * Function that uses base axios instance to fetch match data.
 *
 * This is function should be either wrapped in a Promise
 * or called using alternative async/await syntax.
 *
 * Although axios is a Promise-based API, we need are
 * wrapping in a Promise so that the caller can provide
 * resolution and rejection functions; this is, essentially,
 * the only way to "bubble up" errors.
 *
 * @param {string} query Customizable portion of the URI.
 * @param {number} sleep Milliseconds to pause (used to test latency / loading).
 * @callback {function} success Success callback (Promise resolution).
 * @callback {function} failure Failure callback (Promise rejection).
 */
const loadMatch = (query, sleep, success, failure) => {
  return new Promise((resolve, failed) => {
    const encodedQuery = encodeURIComponent(query);
    API.get(`match/${encodedQuery}`)
      .then(res => {
        return setTimeout(() => success(res.data), sleep);
      })
      .catch(error => {
        let msg;
        if (!error.response || error.code === 'ECONNABORTED') {
          // Traps both timeouts and CORS, etc.
          msg = 'There was a network error...';
        } else {
          msg = error.response.status + ' ' + error.response.statusText;
        }
        return failure(msg);
      });
  });
};

export default loadMatch;
