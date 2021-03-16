import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {
  querySelectors,
  updateResults,
} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {
  getOffers,
  putStopOffer,
  putRunOffer,
  getTickers,
  postCreateOffer,
  putEditOffer,
  deleteOffer,
  getOffer,
  getCurrencyCommission,
  getEmpoExchangeRate,
  getProfitLimits,
} from '@cashelec/shared/api/offers';
import endpoints from '@cashelec/shared/api/endpoints';
import {
  useISESelector,
  mapSelector,
  offersSelector,
  offerSelector,
  tickersSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   offers: Immutable.List,
 *   offer: Immutable.Map,
 *   tickers: Immutable.List,
 *   currencyCommission: Immutable.Map,
 *   empoExchangeRate: Immutable.Map,
 *   offersIsFetching: Boolean,
 *   offersIsInitialized: Boolean,
 *   offerIsFetching: Boolean,
 *   putRunOfferIsFetching: Boolean,
 *   tickersIsFetching: Boolean,
 *   currencyCommissionIsFetching: Boolean,
 *   empoExchangeIsFetching: Boolean,
 *   getOffers: Function,
 *   putStopOffer: Function,
 *   putRunOffer: Function,
 *   getTickers: Function,
 *   postCreateOffer: Function,
 *   putEditOffer: Function,
 *   deleteOffer: Function,
 *   getOffer: Function,
 *   getCurrencyCommission: Function,
 *   getEmpoExchangeRate: Function,
 *   clearOffer: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      offers: offersSelector(state, 'offers'),
      offer: offerSelector(state, 'offer'),
      tickers: tickersSelector(state, 'tickers'),
      currencyCommission: mapSelector(state, 'currencyCommission'),
      empoExchangeRate: mapSelector(state, 'empoExchangeRate'),
      profitLimits: mapSelector(state, 'profitLimits'),

      offersIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getOffersUrl(),
        }) ||
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getCreateOfferUrl(),
        }) ||
        querySelectors.isPending(state.get('queries'), {
          queryKey: `put${endpoints.getCreateOfferUrl()}`,
        }) ||
        querySelectors.isPending(state.get('queries'), {
          queryKey: `delete${endpoints.getCreateOfferUrl()}`,
        }) ||
        false,
      offersIsInitialized:
        !!querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getOffersUrl(),
        }) || false,
      offerIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getOfferByIdUrl(),
        }) ||
        !querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getOfferByIdUrl(),
        }) ||
        false,
      putRunOfferIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getToggleOfferUrl(),
        }) || false,
      tickersIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getTickersUrl(),
        }) || false,
      currencyCommissionIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getCurrencyCommissionUrl(),
        }) || false,
      empoExchangeIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getEmpoExchangeRateUrl(),
        }) || false,
      profitLimitsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getProfitLimitsUrl(),
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
          getOffers,
          putStopOffer,
          putRunOffer,
          getTickers,
          getProfitLimits,
          postCreateOffer,
          putEditOffer,
          deleteOffer,
          getOffer,
          getCurrencyCommission,
          getEmpoExchangeRate,
          clearOffer: () =>
            updateResults({
              offer: undefined,
            }),
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
