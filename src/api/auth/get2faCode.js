import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

/**
 *
 * @param type {String}
 * @param successCallback {Function}
 * @param errorCallback {Function}
 */
export default ({ type, successCallback, errorCallback }) => requestAsync({
  url: endpoints.get2faCodeUrl({ type }),
  transformResult: ({ data }) => ({
    twoFaCode: data,
  }),
  queryKey: endpoints.get2faCodeUrl(),
  meta: {
    successCallback,
    errorCallback,
    authToken: true,
  },
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
  updateResult: {
    twoFaCode: (_, code) => code,
  },
});
