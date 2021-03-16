import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {querySelectors} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {
  postGenerateWallet,
  postSignMsigTx,
  postCreateTx,
  getFee,
} from '@cashelec/shared/api/crypto';
import endpoints from '@cashelec/shared/api/endpoints';
import {useISESelector} from './selectors';

/**
 *
 * @returns {{
 *   createTxIsFetching: Boolean,
 *   postSignMsigTxIsFetching: Boolean,
 *   generateWallet: Function,
 *   postSignMsigTx: Function,
 *   postCreateTx: Function,
 *   getFee: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      createTxIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getCreateTxUrl(),
        }) || false,
      postSignMsigTxIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getSignMsigTxUrl(),
        }) || false,
    }),
    [],
  );

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          postGenerateWallet,
          postSignMsigTx,
          postCreateTx,
          getFee,
        },
        dispatch,
      ),
    [dispatch],
  );

  return {
    ...data,
    ...actions,
  };
};
