import endpoints from 'api/endpoints';

/**
 *
 * @param resultKey {String}
 */
export default ({resultKey = 'banks'} = {}) =>
  requestAsync({
    url: endpoints.getBanksUrl(),
    transformResult: (response) => ({
      [resultKey]: response.data,
    }),
    meta: {
      errorKey: 'GET_BANKS',
    },
    queryKey: endpoints.getBanksUrl(),
    options: {
      headers: {
        Accept: 'application/json',
      },
    },
    updateResult: {
      [resultKey]: (prevResult, result) => result,
    },
  });
