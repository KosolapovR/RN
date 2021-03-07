import endpoints from '../endpoints';

export default () => ({
  url: endpoints.getCryptoBlockHeightUrl(),
  queryKey: endpoints.getCryptoBlockHeightUrl(),
  transformResult: (response) => ({
    cryptoBlockHeight: response.data,
  }),
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
  updateResult: {
    cryptoBlockHeight: (_, newExchangeMeta) => newExchangeMeta,
  },
});
