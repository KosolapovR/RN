import { requestAsync } from '@digitalwing.co/redux-query-immutable';
import endpoints from 'api/endpoints';

export default () => requestAsync({
  url: endpoints.get2faDisableUrl(),
  queryKey: endpoints.get2faDisableUrl(),
  meta: {
    authToken: true,
    errorKey: 'POST_2FA_ENABLED',
  },
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
});
