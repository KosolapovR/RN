import endpoints from 'api/endpoints';

/**
 *
 * @param resultKey {String}
 */
export default ({resultKey = 'paymentSystems'} = {}) => ({
  url: endpoints.getPaymentSystemsUrl(),
  transformResult: (response) => ({
    [resultKey]: response.data,
  }),
  meta: {
    errorKey: 'GET_PAYMENT_SYSTEMS',
  },
  queryKey: endpoints.getPaymentSystemsUrl(),
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  updateResult: {
    [resultKey]: (prevResult, result) => result,
  },
});
