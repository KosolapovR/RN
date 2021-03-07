import {normalize} from 'normalizr';
import {Map} from 'immutable';
import endpoints from 'api/endpoints';
import {user} from 'schemas';

/**
 *
 * @param requestBody {Object}
 * @param successCallback {Function}
 * @param errorCallback {Function}
 */
export default ({requestBody, successCallback, errorCallback}) =>
  requestAsync({
    url: endpoints.getLogin2faUrl(),
    transform: (response) => normalize(response.data, user.schema).entities,
    transformResult: (response) => ({
      user: normalize(response.data, user.schema).result,
    }),
    queryKey: endpoints.getLogin2faUrl(),
    meta: {
      successCallback,
      errorCallback,
    },
    body: {
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      passcode: requestBody.get('passcode'),
      captcha: requestBody.get('captcha'),
      remember: localStorage.getItem('remember') === 'true',
    },
    options: {
      headers: {
        Accept: 'application/json',
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
