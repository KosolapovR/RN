import {normalize} from 'normalizr';
import {Map} from 'immutable';
import endpoints from 'api/endpoints';
import {user} from 'schemas';

/**
 *
 * @typedef PostSignUp
 * @property email {String}
 * @property username {String}
 * @property password {String}
 * @property repeatPassword {String}
 * @property iAgree {Boolean}
 * @property language {String}
 *
 * @param {PostSignUp} requestBody
 * @param successCallback {Function}
 */
export default ({requestBody, successCallback}) =>
  requestAsync({
    url: endpoints.getUserUrl(),
    transform: (response) => normalize(response.data, user.schema).entities,
    transformResult: (response) => ({
      user: normalize(response.data, user.schema).result,
    }),
    queryKey: `getUser${endpoints.getUserUrl()}`,
    body: requestBody,
    meta: {
      errorKey: 'POST_LOGIN',
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
