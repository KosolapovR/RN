import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import { normalize } from 'normalizr';
import { user } from 'schemas';
import endpoints from '../endpoints';

/**
 *
 * @param requestBody {Object}
 * @param errorCallback {Function}
 * @param successCallback {Function}
 */
export default ({ requestBody, errorCallback, successCallback }) => requestAsync({
  url: endpoints.get2faDisableUrl(),
  queryKey: endpoints.get2faDisableUrl(),
  body: requestBody,
  transform: ({ data }) => normalize(data, user.schema).entities,
  meta: {
    authToken: true,
    errorCallback,
    successCallback,
  },
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
  },
  update: {
    user: (prevUserObj, newUserObj) =>
      prevUserObj.merge(newUserObj),
  },
});
