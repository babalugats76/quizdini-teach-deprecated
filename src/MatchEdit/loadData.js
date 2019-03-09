const apiPath = 'https://quizdini-poc.s3.amazonaws.com/match';
const getObjectFromJson = response => response.json();

const throwIfNotOk = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const sleep = (msecs) => (
  results => new Promise(resolve => setTimeout(() => resolve(results), msecs))
);

const loadMatch = (query) => {
  console.log('Inside load Match', query);
  const encodedQuery = encodeURIComponent(query);
  const url = `${apiPath}/${encodedQuery}.json`;
  return fetch(url)
    .then(throwIfNotOk)
    .then(getObjectFromJson)
    .then(sleep(10000));
};

export default loadMatch;