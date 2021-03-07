import {normalize} from 'normalizr';
import endpoints from 'api/endpoints';
import {user} from 'schemas';
import {Map} from 'immutable';

/**
 *
 * @param requestBody {Object}
 * @param token {String}
 * @param successCallback {Function}
 */
export default ({requestBody, token, successCallback}) =>
  requestAsync({
    url: endpoints.getPasswordRecovery2faUrl(),
    queryKey: endpoints.getPasswordRecovery2faUrl(),
    transform: (response) => normalize(response.data, user.schema).entities,
    transformResult: (response) => ({
      user: normalize(response.data, user.schema).result,
    }),
    meta: {
      successCallback,
      errorKey: 'POST_RECOVERY_PASSWORD_2FA',
    },
    body: {
      passcode: requestBody.get('passcode'),
      password: requestBody.get('password'),
    },
    options: {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    },
    update: {
      user: (prevEntities = Map(), nextEntities) =>
        prevEntities.merge(nextEntities),
    },
    updateResult: {
      user: (_, result) => result,
    },
  });
