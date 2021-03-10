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
// export default ({successCallback} = {}) => {
//   debugger;
//   return requestAsync({
//     url: endpoints.get2faCodesUrl(),
//     transformResult: (response) => ({
//       recoveryCodes: response.data,
//     }),
//     queryKey: endpoints.get2faCodesUrl(),
//     meta: {
//       successCallback,
//       authToken: true,
//     },
//     options: {
//       headers: {
//         Accept: 'application/json',
//       },
//       method: 'GET',
//     },
//     updateResult: {
//       recoveryCodes: (_, result) => result,
//     },
//   });
// };
