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
 */
export default ({ requestBody, successCallback }) => requestAsync({
  url: endpoints.getPasswordChangeUrl(),
  queryKey: endpoints.getPasswordChangeUrl(),
  transform: response => normalize(response.data, user.schema).entities,
  transformResult: response => ({
    user: normalize(response.data, user.schema).result,
  }),
  meta: {
    authToken: true,
    successCallback,
  },
  body: requestBody,
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
