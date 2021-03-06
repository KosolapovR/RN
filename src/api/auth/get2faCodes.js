import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

/**
 *
 * @param successCallback {Function}
 */
export default ({ successCallback } = {}) => requestAsync({
  url: endpoints.get2faCodesUrl(),
  transformResult: response => ({
    recoveryCodes: response.data,
  }),
  queryKey: endpoints.get2faCodesUrl(),
  meta: {
    successCallback,
    authToken: true,
  },
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
  updateResult: {
    recoveryCodes: (_, result) => result,
  },
});
