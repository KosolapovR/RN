import endpoints from 'api/endpoints';

/**
 *
 * @param resultKey {String}
 */
export default ({resultKey = 'cryptocurrencies'} = {}) => ({
  url: endpoints.getCryptocurrenciesUrl(),
  transform: (response) => ({
    [resultKey]: response.data,
  }),
  meta: {
    errorKey: 'GET_CRYPTOCURRENCIES',
  },
  queryKey: endpoints.getCryptocurrenciesUrl(),
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  update: {
    [resultKey]: (prevResult, result) => result,
  },
});
