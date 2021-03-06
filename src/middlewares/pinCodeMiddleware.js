import _ from 'lodash';

/**
 * Add pinCode to api action
 *
 * @return {void}
 */
export default () => (next) => (action) => {
  // if ((
  //   _.isEqual(action.type, actionTypes.REQUEST_ASYNC)
  //   || _.isEqual(action.type, actionTypes.MUTATE_ASYNC))
  //   && action.meta.pinCode
  // ) {
  //   const callAPI = action;
  //   const { pinCode } = callAPI.meta;
  //   delete callAPI.meta.pinCode;
  //
  //   if (pinCode) {
  //     callAPI.options.headers = {
  //       ...callAPI.options.headers,
  //       Pin: pinCode,
  //     };
  //   }
  //   return next(action);
  // }
  return next(action);
};
