import {normalize} from 'normalizr';
import endpoints from 'api/endpoints';
import {user} from 'schemas';
import {Map} from 'immutable';

/**
 *
 * @param requestBody {Object}
 * @param successCallback {Function}
 */
export default ({requestBody, successCallback}) =>
  requestAsync({
    url: endpoints.get2faEnableUrl(),
    transform: (response) => normalize(response.data, user.schema).entities,
    transformResult: (response) => ({
      user: normalize(response.data, user.schema).result,
    }),
    queryKey: endpoints.get2faEnableUrl(),
    body: requestBody,
    meta: {
      authToken: true,
      errorKey: 'POST_2FA_ENABLED',
      successCallback,
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
