import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors, updateEntities, updateResults } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { deal } from 'schemas';
import endpoints from 'api/endpoints';
import {
  getDeal,
  postCreateDeal,
  putConfirmDeal,
  putSubmitSending,
  putSubmitReceiving,
  putSubmitSignTransaction,
  putInviteAdmin,
  putRateDeal,
  putCancelDeal,
} from 'api/deals';
import { getPublicUserProfile } from 'api/users';
import {
  dealSelector,
  entitiesSelector,
  useISESelector,
  userSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   dealsEntities: String,
 *   deal: Immutable.List,
 *   seller: Immutable.Map,
 *   buyer: Immutable.Map,
 *   postCreateDealIsFetching: Boolean,
 *   putInviteAdminIsFetching: Boolean,
 *   getDealIsFetching: Boolean,
 *   putSubmitIsFetching: Boolean,
 *   putConfirmDealIsFetching: Boolean,
 *   putSubmitSignTransactionIsFetching: Boolean,
 *   putCancelDealIsFetching: Boolean,
 *   getDeal: Function,
 *   postCreateDeal: Function,
 *   putConfirmDeal: Function,
 *   putSubmitSending: Function,
 *   putSubmitReceiving: Function,
 *   putSubmitSignTransaction: Function,
 *   putInviteAdmin: Function,
 *   putRateDeal: Function,
 *   getPublicUserProfile: Function,
 *   putCancelDeal: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    dealsEntities: entitiesSelector(state, 'deal'),
    deal: dealSelector(state, 'deal'),
    seller: userSelector(state, 'seller'),
    buyer: userSelector(state, 'buyer'),
    postCreateDealIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `post${endpoints.getDealUrl()}` },
    ) || false,
    putInviteAdminIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getInviteAdminUrl() },
    ) || false,
    getDealIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getDealByIdUrl() },
    ) || false,
    putSubmitIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubmitReceivingUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubmitSendingUrl() },
    ) || false,
    putConfirmDealIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getConfirmDealUrl() },
    ) || false,
    putSubmitSignTransactionIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubmitSignTransactionUrl() },
    ) || false,
    putCancelDealIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getCancelDealUrl() },
    ) || false,
  }), []);

  const store = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getDeal,
    postCreateDeal,
    putConfirmDeal,
    putSubmitSending,
    putSubmitReceiving,
    putSubmitSignTransaction,
    putInviteAdmin,
    putRateDeal,
    getPublicUserProfile,
    putCancelDeal,
    updateDealsEntities: dealsEntities => updateEntities({ deal: dealsEntities }),
    updateDealsResults: (dealsResults, metaResults, type) => updateResults({
      [`${type}Deals`]: dealsResults,
      [`${type}DealsMeta`]: metaResults,
    }),
    clearDeal: () => updateResults({ deal: undefined }),
  }, dispatch),
  [dispatch]);

  const updateDeals = useCallback((data) => {
    const { entities } = normalize(data, deal.schema);
    actions.updateDealsEntities(store.dealsEntities.mergeDeep(fromJS(entities.deal)));
  }, [store.dealsEntities]);

  return {
    ...store,
    ...actions,
    updateDeals,
  };
};
