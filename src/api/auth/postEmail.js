import {normalize} from 'normalizr';
import endpoints from 'api/endpoints';
import {user} from 'schemas';
import {Map} from 'immutable';

/**
 * @param requestBody {Object}
 * @param successCallback {Function}
 * @param errorCallback {Function}
 */
export default ({requestBody, successCallback, errorCallback}) =>
  requestAsync({
    url: endpoints.getEmailChangeUrl(),
    transform: (response) => {
      if (response.data.email) {
        return normalize(response.data, user.schema).entities;
      }
      return {};
    },
    transformResult: (response) => {
      if (response.data.email) {
        return {
          user: normalize(response.data, user.schema).result,
        };
      }
      return {};
    },
    queryKey: endpoints.getEmailChangeUrl(),
    meta: {
      authToken: true,
      errorKey: 'POST_EMAIL',
      successCallback,
      errorCallback,
    },
    body: requestBody.toJS(),
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
      user: (prevResult, result) => result || prevResult,
    },
  });
