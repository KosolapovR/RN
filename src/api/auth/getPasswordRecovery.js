import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

/**
 *
 * @param requestBody {Object}
 * @param successCallback {Function}
 */
export default ({ requestBody, successCallback }) => requestAsync({
  url: endpoints.getPasswordRecoveryUrl(requestBody.toJS()),
  queryKey: endpoints.getPasswordRecoveryUrl(),
  meta: {
    errorKey: 'PASSWORD_RECOVERY',
    errorParams: {
      email: requestBody.get('email'),
    },
    successCallback,
  },
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
});
