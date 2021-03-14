import _ from 'lodash';

/**
 * Если передан meta.successCallback, он будет вызван.
 *
 * @return {void}
 */
export default () => (next) => (action) => {
  if (
    action.type === '@@query/REQUEST_SUCCESS' ||
    action.type === '@@query/MUTATE_SUCCESS'
  ) {
    const {successCallback} = action.meta;
    if (successCallback && _.isFunction(successCallback)) {
      successCallback(action.responseBody);
    }
  }

  return next(action);
};
