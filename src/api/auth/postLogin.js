import {requestAsync} from '@digitalwing.co/redux-query-immutable';
import {normalize} from 'normalizr';
import endpoints from 'api/endpoints';
import {user} from 'schemas';
import {Map} from 'immutable';
import {TWOFA_REQUIRED} from 'shared/consts/errorCodes';

/**
 *
 * @param requestBody {Object}
 * @param successCallback {Function}
 * @param errorCallback {Function}
 */
export default ({requestBody, successCallback, errorCallback}) =>
  requestAsync({
    url: endpoints.getLoginUrl(),
    transform: (response) => {
      if (response.errorCode !== TWOFA_REQUIRED) {
        return normalize(response.data, user.schema).entities;
      }
      return {};
    },
    transformResult: (response) => {
      if (response.errorCode !== TWOFA_REQUIRED) {
        return {
          user: normalize(response.data, user.schema).result,
        };
      }
      return {};
    },
    queryKey: endpoints.getLoginUrl(),
    body: requestBody.toJS(),
    meta: {
      withoutErrorToast: true,
      successCallback,
      errorCallback,
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
      user: (_, result) => result || '',
    },
  });
