import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import {
  querySelectors,
  updateEntities,
  updateResults,
} from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import { Map } from 'immutable';
import {
  getWallets,
  getWallet,
  getWalletValidate,
  postCreateNewMsigWallet,
  postInternalWallet,
  postInternalWallets,
  postImportedWallet,
  putWallet,
  deleteWallet,
  putSendMoneyFromInternal,
  putSendMoneyFromMsig,
  postRechargeRequest,
  getRechargeRequest,

  getBankCards,
  getBankCard,
  postBankCard,
  putBankCard,
  deleteBankCard,
  postBank,

  getPaymentSystemAccounts,
  postPaymentSystemAccount,
  putPaymentSystemAccount,
  deletePaymentSystemAccount,
} from 'api/payments';
import endpoints from 'api/endpoints';
import {
  useISESelector,
  mapSelector,
  walletsSelector,
  bankCardsSelector,
  accountPaymentSystemsSelector,
  entitiesSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   walletEntities: String,
 *   wallets: Immutable.List,
 *   metaWallets: Immutable.Map,
 *   ethWallet: Immutable.List,
 *   walletsByAlias: Immutable.List,
 *   bankCards: Immutable.List,
 *   accountPaymentSystems: Immutable.List,
 *   rechargeRequest: Immutable.Map,
 *
 *   getPaymentSystemsIsFetching: Boolean,
 *   walletsIsFetching: Boolean,
 *   postInternalWallets: Boolean,
 *   walletsToSellerIsFetching: Boolean,
 *   getToWalletIsFetching: Boolean,
 *   getWalletMsigEthIsFetching: Boolean,
 *   getWalletsIsInitializing: Boolean,
 *   importedWalletIsFetching: Boolean,
 *   deleteWalletIsFetching: Boolean,
 *   getRechargeRequestIsFetching: Boolean,
 *   postBankIsFetching: Boolean,
 *   postBankCardIsFetching: Boolean,
 *
 *   getWallets: Function,
 *   getWallet: Function,
 *   getWalletValidate: Function,
 *   postCreateNewMsigWallet: Function,
 *   postInternalWallet: Function,
 *   postInternalWallets: Function,
 *   postImportedWallet: Function,
 *   putWallet: Function,
 *   deleteWallet: Function,
 *   putSendMoneyFromInternal: Function,
 *   putSendMoneyFromMsig: Function,
 *   postRechargeRequest: Function,
 *   getRechargeRequest: Function,
 *   getBankCards: Function,
 *   getBankCard: Function,
 *   postBankCard: Function,
 *   putBankCard: Function,
 *   deleteBankCard: Function,
 *   postBank: Function,
 *   getPaymentSystemAccounts: Function,
 *   postPaymentSystemAccount: Function,
 *   putPaymentSystemAccount: Function,
 *   deletePaymentSystemAccount: Function,
 *   updateWalletEntities: Function,
 *   clearRechargeRequest: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    walletEntities: entitiesSelector(state, 'wallet'),
    transactionEntities: entitiesSelector(state, 'transaction'),
    wallets: walletsSelector(state, 'wallets'),
    metaWallets: mapSelector(state, 'metaWallets'),
    ethWallet: walletsSelector(state, 'ethWallet'),
    walletsByAlias: walletsSelector(state, 'walletsByAlias'),
    bankCards: bankCardsSelector(state, 'bankCards'),
    accountPaymentSystems: accountPaymentSystemsSelector(state, 'accountPaymentSystems'),
    rechargeRequest: mapSelector(state, 'rechargeRequest'),

    getPaymentSystemsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getAccountPaymentSystemsUrl() },
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
    postInternalWallets: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getInternalWalletAllUrl() },
    ),
    walletsToSellerIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getAccountPaymentSystemsUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getBankCardUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getWalletsUrl() },
    ) || false,
    getToWalletIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `toWallet${endpoints.getWalletByIdUrl()}` },
    ) || false,
    getWalletMsigEthIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `ethWallet${endpoints.getWalletsUrl()}` },
    ) || false,
    getWalletsIsInitializing: !!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getWalletsUrl() },
    ) || false,
    importedWalletIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getImportedWalletUrl() },
    ) || false,
    deleteWalletIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `delete${endpoints.getWalletByIdUrl()}` },
    ) || false,
    getRechargeRequestIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getRechargeRequestByIdUrl() },
    ) || false,
    postBankIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `post${endpoints.getBanksUrl()}` },
    ) || false,
    postBankCardIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `post${endpoints.getBankCardUrl()}` },
    ) || false,
    putSendMoneyFromInternalIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSendMoneyFromInternalUrl() },
    ) || false,
  }), []);

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getWallets,
    getWallet,
    getWalletValidate,
    postCreateNewMsigWallet,
    postInternalWallet,
    postInternalWallets,
    postImportedWallet,
    putWallet,
    deleteWallet,
    putSendMoneyFromInternal,
    putSendMoneyFromMsig,
    postRechargeRequest,
    getRechargeRequest,

    getBankCards,
    getBankCard,
    postBankCard,
    putBankCard,
    deleteBankCard,
    postBank,

    getPaymentSystemAccounts,
    postPaymentSystemAccount,
    putPaymentSystemAccount,
    deletePaymentSystemAccount,
    updateWalletEntities: walletEntities => updateEntities({ wallet: walletEntities }),
    updateTransactionEntities: transactionEntities =>
      updateEntities({ transaction: transactionEntities }),
    clearRechargeRequest: () => updateResults({ rechargeRequest: Map() }),
  }, dispatch),
  [dispatch]);

  return {
    ...data,
    ...actions,
  };
};
