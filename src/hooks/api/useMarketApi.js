import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors, updateResults } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import endpoints from 'api/endpoints';
import {
  getMostPopularPair,
  getMarketOffers,
  getMarketPeopleCount,
  getCurrencyCourses,
  getMarketPairs,
  postCreateSubscription,
  getSubscriptions,
  deleteSubscribe,
} from 'api/market';
import {
  mapSelector,
  useISESelector,
  listSelector,
  primitiveSelector,
  currencyCoursesSelector,
  marketSubscriptionsSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   marketOffers: Immutable.List,
 *   buyMarketOffers: Immutable.List,
 *   marketPeopleCount: String
 *   marketMeta: Immutable.Map,
 *   buyMarketMeta: Immutable.Map,
 *   courses: Immutable.List,
 *   popularPair: Immutable.Map,
 *   marketPairs: Immutable.Map,
 *   marketSubscriptions: Immutable.List,
 *   sellRateLimits: Immutable.Map,
 *   buyRateLimits: Immutable.Map,
 *   popularPairIsFetching: Boolean,
 *   popularPairIsInitializing: Boolean,
 *   sellMarketOffersIsFetching: Boolean,
 *   buyMarketOffersIsFetching: Boolean,
 *   marketPairsIsFetching: Boolean,
 *   sellMarketOffersIsInitializing: Boolean,
 *   buyMarketOffersIsInitializing: Boolean,
 *   subscriptionsIsFetching: Boolean,
 *   postSubIsFetching: Boolean,
 *   getMostPopularPair: Function,
 *   getMarketOffers: Function,
 *   getMarketFilters: Function,
 *   getMarketPeopleCount: Function,
 *   getCurrencyCourses: Function,
 *   getMarketPairs: Function,
 *   postCreateSubscription: Function,
 *   getSubscriptions: Function,
 *   deleteSubscribe: Function,
 *   updatePeopleCount: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    marketOffers: listSelector(state, 'marketOffers'),
    buyMarketOffers: listSelector(state, 'buyMarketOffers'),
    marketPeopleCount: primitiveSelector(state, 'marketPeopleCount', 0),
    marketMeta: mapSelector(state, 'marketOffersMeta'),
    buyMarketMeta: mapSelector(state, 'buyMarketOffersMeta'),
    courses: currencyCoursesSelector(state, 'courses'),
    popularPair: mapSelector(state, 'popularPair'),
    marketPairs: mapSelector(state, 'marketPairs'),
    marketSubscriptions: marketSubscriptionsSelector(state, 'marketSubscriptions'),
    sellRateLimits: mapSelector(state, 'sellRateLimits'),
    buyRateLimits: mapSelector(state, 'buyRateLimits'),

    popularPairIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getMostPopularPairUrl() },
    ) || false,
    popularPairIsInitializing: !!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getMostPopularPairUrl() },
    ) || false,
    sellMarketOffersIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `marketOffers${endpoints.getMarketUrl()}` },
    ) || false,
    buyMarketOffersIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `buyMarketOffers${endpoints.getMarketUrl()}` },
    ) || false,
    marketPairsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getMarketPairsUrl() },
    ) || false,
    sellMarketOffersIsInitializing: !!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: `marketOffers${endpoints.getMarketUrl()}` },
    ) || false,
    buyMarketOffersIsInitializing: !!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: `buyMarketOffers${endpoints.getMarketUrl()}` },
    ) || false,
    subscriptionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubscribeUrl() },
    ) || false,
    postSubIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubscribeUrl() },
    ) || false,
  }), []);

  const store = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getMostPopularPair,
    getMarketOffers,
    getMarketPeopleCount,
    getCurrencyCourses,
    getMarketPairs,
    postCreateSubscription,
    getSubscriptions,
    deleteSubscribe,
    updatePeopleCount: ({ count }) => updateResults({ marketPeopleCount: count }),
  }, dispatch),
  [dispatch]);

  return {
    ...store,
    ...actions,
  };
};
