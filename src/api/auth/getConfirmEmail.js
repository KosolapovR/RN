import {normalize} from 'normalizr';
import endpoints from 'api/endpoints';
import {user} from 'schemas';
import {Map} from 'immutable';

/**
 *
 * @param token {String}
 * @param email {String}
 * @param prevEmail {String}
 * @param successCallback {Function}
 * @param errorCallback {Function}
 */
export default ({token, email, prevEmail, successCallback, errorCallback}) =>
  requestAsync({
    url: endpoints.getConfirmEmailUrl({email, prevEmail}),
    transform: (response) => normalize(response.data, user.schema).entities,
    transformResult: (response) => ({
      user: normalize(response.data, user.schema).result,
    }),
    meta: {
      errorKey: 'GET_CONFIRM_EMAIL',
      successCallback,
      errorCallback,
    },
    queryKey: endpoints.getConfirmEmailUrl(),
    options: {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    },
    update: {
      user: (prevEntities = Map(), nextEntities) =>
        prevEntities.merge(nextEntities),
    },
    updateResult: {
      user: (_, result) => result,
    },
  });
