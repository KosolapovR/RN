import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import { normalize } from 'normalizr';
import endpoints from 'api/endpoints';
import { user } from 'schemas';
import { Map } from 'immutable';

/**
 *
 * @param requestBody {Object}
 * @param token {String}
 * @param successCallback {Function}
 * @param errorCallback {Function}
 */
export default ({
  requestBody,
  token,
  successCallback,
  errorCallback,
}) => requestAsync({
  url: endpoints.getConfirmUrl(requestBody),
  transform: response => normalize(response.data, user.schema).entities,
  transformResult: response => ({
    user: normalize(response.data, user.schema).result,
  }),
  queryKey: endpoints.getConfirmUrl(),
  meta: {
    errorKey: 'GET_CONFIRM',
    successCallback,
    errorCallback,
  },
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
