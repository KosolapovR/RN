import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

/**
 *
 * @param successCallback {Function}
 */
export default successCallback => requestAsync({
  url: endpoints.get2faKeyUrl(),
  transformResult: (response) => {
    const key2fa = response.data;
    const url = new URL(response.data);
    const key2faShort = url.searchParams.get('secret');

    return ({
      key2fa,
      key2faShort,
    });
  },
  queryKey: endpoints.get2faKeyUrl(),
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
    key2fa: (_, result) => result,
    key2faShort: (_, result) => result,
  },
});
