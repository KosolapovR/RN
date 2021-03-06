import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors, updateResults } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import {
  getBanks,
  getCryptoBlockHeight,
  getCryptocurrencies,
  getPaymentSystems,
  getExchangeRateBySymbol,
  getCryptocurrenciesCommissions,
  getFiatCurrencies,
  getExchanges,
} from 'api/resources';
import endpoints from 'api/endpoints';
import {
  useISESelector,
  listSelector,
  primitiveSelector,
  fiatCurrenciesSelector,
  exchangesSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   resources: Immutable.Map,
 *      banks: Immutable.List,
 *      paymentSystems: Immutable.List,
 *   selectedExchangeRate: String
 *   cryptocurrenciesCommissions: Immutable.List,
 *   fiatCurrencies: Immutable.List,
 *   exchanges: Immutable.List,
 *   resourcesIsFetching: Boolean,
 *   exchangeRateIsFetching: Boolean,
 *   getCommissionsIsFetching: Boolean,
 *   exchangesIsFetching: Boolean,
 *   getBanks: Function: Boolean,
 *   getCryptocurrencies: Function,
 *   getPaymentSystems: Function,
 *   getExchangeRateBySymbol: Function,
 *   getCryptocurrenciesCommissions: Function,
 *   getFiatCurrencies: Function,
 *   getExchanges: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    resources: {
      cryptocurrencies: listSelector(state, 'cryptocurrencies'),
      banks: listSelector(state, 'banks'),
      paymentSystems: listSelector(state, 'paymentSystems'),
    },
    selectedExchangeRate: primitiveSelector(state, 'selectedExchangeRate', 0),
    // ethExchangeRate: primitiveSelector(state, 'ethExchangeRate', 0),
    cryptocurrenciesCommissions: listSelector(state, 'cryptocurrenciesCommissions'),
    fiatCurrencies: fiatCurrenciesSelector(state, 'fiatCurrencies'),
    cryptoBlockHeight: listSelector(state, 'cryptoBlockHeight'),
    exchanges: exchangesSelector(state, 'exchanges'),

    resourcesIsFetching: !!(!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getCryptocurrenciesUrl() },
    ) || !querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getBanksUrl() },
    ) || !querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getFiatCurrenciesUrl() },
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
    exchangeRateIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `${endpoints.getExchangeRateBySymbolUrl()}-selectedExchangeRate` },
    ) || false,
    getCommissionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCryptocurrenciesCommissionsUrl() },
    ) || false,
    cryptoBlockHeightIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCryptoBlockHeightUrl() },
    ) || false,
    exchangesIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getExchangesListUrl() },
    ) || false,
  }), []);

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getBanks,
    getCryptoBlockHeight,
    getCryptocurrencies,
    getPaymentSystems,
    getExchangeRateBySymbol,
    getCryptocurrenciesCommissions,
    getFiatCurrencies,
    getExchanges,
    updateCryptoBlockHeight: nextCryptoBlockHeight =>
      updateResults({ cryptoBlockHeight: nextCryptoBlockHeight }),
  }, dispatch),
  [dispatch]);

  return {
    resources: {
      cryptocurrencies: data.cryptocurrencies,
      banks: data.banks,
      paymentSystems: data.paymentSystems,
    },
    ...data,
    ...actions,
  };
};
