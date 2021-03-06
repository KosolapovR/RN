import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import endpoints from 'api/endpoints';
import {
  getAllCryptoStats,
  getCryptoStats,
} from 'api/stats';
import {
  useISESelector,
  cryptoStatsSelector,
  mapSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   cryptoStats: Immutable.Map,
 *   cryptoStatsIsFetching: Boolean,
 *   getCryptoStats: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    cryptoStats: cryptoStatsSelector(state, 'cryptoStats'),
    allCryptoStats: mapSelector(state, 'allCryptoStats'),

    cryptoStatsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCryptoStatUrl() },
    ) || !querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getCryptoStatUrl() },
    ) || false,
    allCryptoStatsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getAllCryptoStatsUrl() },
    ) || false,
  }), []);

  const store = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getAllCryptoStats,
    getCryptoStats,
  }, dispatch),
  [dispatch]);

  return {
    ...store,
    ...actions,
  };
};
