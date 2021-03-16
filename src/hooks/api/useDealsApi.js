import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {querySelectors} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import endpoints from '@cashelec/shared/api/endpoints';
import {getDeals} from '@cashelec/shared/api/deals';
import {
  mapSelector,
  useISESelector,
  userSelector,
  dealsSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   closedDeals: Immutable.List,
 *   activeDeals: Immutable.List,
 *   newDeals: Immutable.List,
 *   closedDealsMeta: Immutable.Map,
 *   activeDealsMeta: Immutable.Map,
 *   newDealsMeta: Immutable.Map,
 *   buyer: Immutable.Map,
 *   activeDealsIsFetching: Boolean,
 *   closedDealsIsFetching: Boolean,
 *   newDealsIsFetching: Boolean,
 *   getDealsIsFetching: Boolean,
 *   getDeals: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      closedDeals: dealsSelector(state, 'closedDeals'),
      activeDeals: dealsSelector(state, 'activeDeals'),
      newDeals: dealsSelector(state, 'newDeals'),
      closedDealsMeta: mapSelector(state, 'closedDealsMeta'),
      activeDealsMeta: mapSelector(state, 'activeDealsMeta'),
      newDealsMeta: mapSelector(state, 'newDealsMeta'),
      buyer: userSelector(state, 'buyer'),

      activeDealsIsFetching: querySelectors.isPending(
        state.get('queries'),
        {queryKey: `${endpoints.getDealsUrl()}/activeDeals`} || false,
      ),
      closedDealsIsFetching: querySelectors.isPending(
        state.get('queries'),
        {queryKey: `${endpoints.getDealsUrl()}/closedDeals`} || false,
      ),
      newDealsIsFetching: querySelectors.isPending(
        state.get('queries'),
        {queryKey: `${endpoints.getDealsUrl()}/newDeals`} || false,
      ),
      getDealsIsFetching:
        !(
          querySelectors.lastUpdated(state.get('queries'), {
            queryKey: `${endpoints.getDealsUrl()}/activeDeals`,
          }) ||
          querySelectors.lastUpdated(state.get('queries'), {
            queryKey: `${endpoints.getDealsUrl()}/closedDeals`,
          }) ||
          querySelectors.lastUpdated(state.get('queries'), {
            queryKey: `${endpoints.getDealsUrl()}/newDeals`,
          })
        ) || false,
    }),
    [],
  );

  const store = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          getDeals,
        },
        dispatch,
      ),
    [dispatch],
  );

  return {
    ...store,
    ...actions,
  };
};
