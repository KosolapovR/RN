import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

/**
 *
 * @typedef GetCheckUsername
 * @property data {String}
 *
 * @param {GetCheckUsername} queryParams
 * @param successCallback {Function}
 */
export default ({ queryParams, successCallback }) => requestAsync({
  url: endpoints.getCheckUsernameUrl(queryParams),
  queryKey: endpoints.getCheckUsernameUrl(),
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
