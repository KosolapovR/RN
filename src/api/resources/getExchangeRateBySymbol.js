import endpoints from 'api/endpoints';
import _ from 'lodash';

/**
 *
 * @typedef GetExchangeRate
 * @property symbol {String}
 *
 * @param GetExchangeRate queryParams
 * @param successCallback {Function}
 * @param resultKey {String}
 */
export default ({
  queryParams,
  successCallback,
  resultKey = 'selectedExchangeRate',
  exchange,
}) => ({
  url: endpoints.getExchangeRateBySymbolUrl(queryParams),
  transformResult: (body, response) => {
    let result;

    try {
      result = JSON.parse(response);
    } catch (err) {
      result = {};
    }

    if (exchange) {
      return {
        [resultKey]:
          +(
            _.get(result, 'data', []).find(
              (item) => item.exchange === exchange,
            ) || {}
          ).rate || 0,
      };
    }

    return {
      [resultKey]: +_.get(result, 'data[0].rate', 0),
    };
  },
  meta: {
    successCallback,
  },
  queryKey: `${endpoints.getExchangeRateBySymbolUrl()}-${resultKey}`,
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  updateResult: {
    [resultKey]: (prevResult, result) => result,
  },
});
