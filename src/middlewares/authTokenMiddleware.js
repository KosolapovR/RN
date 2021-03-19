import _ from 'lodash';
import {actionTypes} from '@digitalwing.co/redux-query-immutable';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Add Authorization header to api action
 *
 * @return {void}
 */
export default () => (next) => async (action) => {
  if (
    (_.isEqual(action.type, actionTypes.REQUEST_ASYNC) ||
      _.isEqual(action.type, actionTypes.MUTATE_ASYNC)) &&
    action.meta.authToken
  ) {
    const callAPI = action;
    delete callAPI.meta.authToken;

    let userToken;
    userToken = await EncryptedStorage.getItem('AUTH_TOKEN');
    if (!userToken) {
      userToken = await EncryptedStorage.getItem('AUTH_TOKEN_BEFORE_2FA');
    }

    if (userToken) {
      callAPI.options.headers = {
        ...callAPI.options.headers,
        Authorization: `Bearer ${userToken}`,
      };
    }
    return next(action);
  }
  return next(action);
};
