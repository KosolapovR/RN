import endpoints from 'api/endpoints';

/**
 *
 * @param successCallback {Function}
 */

export const get2faCodesRequest = ({errorCallback}) => {
  return {
    url: endpoints.get2faCodesUrl(),
    update: {
      recoveryCodes: (prev, next) => next,
    },
    // queryKey: endpoints.get2faCodesUrl(),
    meta: {
      errorCallback,
    },
    options: {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    },
  };
};
