import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import endpoints from 'api/endpoints';
import {
  get2faCodes,
} from 'api/auth';
import {
  getActiveTopics,
  getSubscriptions,
} from 'api/forum';
import { getNews } from 'api/news';
import {
  getWallets,
  getLastTransactions,
} from 'api/payments';
import {
  getLogHistory,
  getAuthHistory,
  putStep,
  getUserInfo,
} from 'api/users';
import {
  getMarketPairs,
  getMostPopularPair,
} from 'api/market';
import { getTickers, getEmpoExchangeRate } from 'api/offers';
import { getDeals } from 'api/deals';
import { getExchangeRateBySymbol } from 'api/resources';
import {
  mapSelector,
  useISESelector,
  listSelector,
  walletsSelector,
  logHistorySelector,
  authHistorySelector,
  newsSelector,
  transactionsSelector,
  topicsSelector,
  currencyCoursesSelector,
  userInfoSelector,
  storiesSelector,
  dealsSelector,
  primitiveSelector,
  fiatCurrenciesSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   wallets: Immutable.List,
 *   metaWallets: Immutable.Map,
 *   logHistory: Immutable.List,
 *   authHistory: Immutable.List,
 *   recoveryCodes: Immutable.List,
 *   newsList: Immutable.List,
 *   activeTopics: Immutable.List,
 *   lastTransactions: Immutable.List,
 *   forumSubscriptions: Immutable.List,
 *   courses: Immutable.List,
 *   currentUserInfo: Immutable.List,
 *   resources: Immutable.Map,
 *   popularPair: Immutable.Map,
 *   stories: Immutable.List,
 *   marketPairs: Immutable.Map,
 *   activeDeals: Immutable.List,
 *   activeDealsMeta: Immutable.Map,
 *   selectedExchangeRate: String,
 *   get2faCodesIsFetching: Boolean,
 *   getLogHistoryIsFetching: Boolean,
 *   getAuthHistoryIsFetching: Boolean,
 *   getNewsIsFetching: Boolean,
 *   getLastTransactionsIsFetching: Boolean,
 *   getForumSubscriptionsIsFetching: Boolean,
 *   offersIsFetching: Boolean,
 *   walletsIsFetching: Boolean,
 *   resourcesIsFetching: Boolean,
 *   tickersIsFetching: Boolean,
 *   popularPairIsFetching: Boolean,
 *   empoExchangeIsFetching: Boolean,
 *   activeDealsIsFetching: Boolean,
 *   exchangeRateIsFetching: Boolean,
 *   cryptocurrenciesIsFetching: Boolean,
 *   get2faCodes: Function,
 *   getActiveTopics: Function,
 *   getSubscriptions: Function,
 *   getNews: Function,
 *   getWallets: Function,
 *   getLastTransactions: Function,
 *   getLogHistory: Function,
 *   getAuthHistory: Function,
 *   putStep: Function,
 *   getTickers: Function,
 *   getEmpoExchangeRate: Function,
 *   getMarketPairs: Function,
 *   getUserInfo: Function,
 *   getDeals: Function,
 *   getMostPopularPair: Function,
 *   getExchangeRateBySymbol: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    wallets: walletsSelector(state, 'wallets'),
    metaWallets: mapSelector(state, 'metaWallets'),
    logHistory: logHistorySelector(state, 'logHistory'),
    authHistory: authHistorySelector(state, 'authHistory'),
    recoveryCodes: listSelector(state, 'recoveryCodes'),
    newsList: newsSelector(state, 'news'),
    activeTopics: topicsSelector(state, 'activeTopics'),
    lastTransactions: transactionsSelector(state, 'transactionMeta'),
    forumSubscriptions: topicsSelector(state, 'subscriptions'),
    courses: currencyCoursesSelector(state, 'courses'),
    currentUserInfo: userInfoSelector(state, 'currentUserInfo'),
    resources: {
      cryptocurrencies: listSelector(state, 'cryptocurrencies'),
      banks: listSelector(state, 'banks'),
      paymentSystems: listSelector(state, 'paymentSystems'),
    },
    popularPair: mapSelector(state, 'popularPair'),
    stories: storiesSelector(state, 'stories'),
    marketPairs: mapSelector(state, 'marketPairs'),
    activeDeals: dealsSelector(state, 'activeDeals'),
    activeDealsMeta: mapSelector(state, 'activeDealsMeta'),
    newDeals: dealsSelector(state, 'newDeals'),
    newDealsMeta: mapSelector(state, 'newDealsMeta'),
    selectedExchangeRate: primitiveSelector(state, 'selectedExchangeRate', 0),
    fiatCurrencies: fiatCurrenciesSelector(state, 'fiatCurrencies'),

    get2faCodesIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.get2faCodesUrl() },
    ) || false,
    getLogHistoryIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getLogHistoryUrl({}) },
    ) || false,
    getAuthHistoryIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getAuthHistoryUrl({}) },
    ) || false,
    getNewsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getNewsUrl() },
    ) || false,
    getLastTransactionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getLastTransactionsUrl() },
    ) || false,
    getForumSubscriptionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubscriptionUrl() },
    ),
    offersIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getOffersUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getToggleOfferUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getToggleOfferUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCreateOfferUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: `put${endpoints.getCreateOfferUrl()}` },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: `delete${endpoints.getCreateOfferUrl()}` },
    ) || false,
    walletsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getAccountPaymentSystemsUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getBankCardUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getWalletsUrl() },
    ) || !querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getWalletsUrl() },
    ) || false,
    resourcesIsFetching: !!(!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getCryptocurrenciesUrl() },
    ) || !querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getBanksUrl() },
    ) || !querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getPaymentSystemsUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCryptocurrenciesUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getBanksUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getPaymentSystemsUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getFiatCurrenciesUrl() },
    ) || false),
    tickersIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getTickersUrl() },
    ) || false,
    popularPairIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getMostPopularPairUrl() },
    ) || false,
    empoExchangeIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getEmpoExchangeRateUrl() },
    ) || false,
    activeDealsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `${endpoints.getDealsUrl()}/activeDeals` } || false,
    ),
    exchangeRateIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getExchangeRateBySymbolUrl() },
    ) || false,
    cryptocurrenciesIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCryptocurrenciesUrl() },
    ) || false,
  }), []);

  const store = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    get2faCodes,
    getActiveTopics,
    getSubscriptions,
    getNews,
    getWallets,
    getLastTransactions,
    getLogHistory,
    getAuthHistory,
    putStep,
    getTickers,
    getEmpoExchangeRate,
    getMarketPairs,
    getUserInfo,
    getDeals,
    getMostPopularPair,
    getExchangeRateBySymbol,
  }, dispatch),
  [dispatch]);

  return {
    resources: {
      cryptocurrencies: store.cryptocurrencies,
      banks: store.banks,
      paymentSystems: store.paymentSystems,
    },
    ...store,
    ...actions,
  };
};
