import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

/**
 *
 * @typedef GetCheckEmail
 * @property data {String}
 *
 * @param {GetCheckEmail} queryParams
 * @param successCallback {Function}
 */
export default ({ queryParams, successCallback }) => requestAsync({
  url: endpoints.getCheckEmailUrl(queryParams),
  queryKey: endpoints.getCheckEmailUrl(),
  meta: {
    authToken: true,
    successCallback,
  },
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
});
