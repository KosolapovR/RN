import endpoints from 'api/endpoints';

/**
 *
 * @param resultKey {String}
 */
export default ({resultKey = 'cryptocurrenciesCommissions'} = {}) => ({
  url: endpoints.getCryptocurrenciesCommissionsUrl(),
  queryKey: endpoints.getCryptocurrenciesCommissionsUrl(),
  transformResult: (response) => ({
    [resultKey]: response.data,
  }),
  meta: {
    errorKey: 'GET_CRYPTOCURRENCIES',
  },
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  updateResult: {
    [resultKey]: (prevResult, result) => result,
  },
});
