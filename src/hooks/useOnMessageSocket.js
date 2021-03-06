import { useCallback } from 'react';
import { normalize } from 'normalizr';
import { fromJS, Map, List } from 'immutable';
import {
  WEBSOCKET_EVENT_TYPES,
  MODEL_CHANGE_TYPES,
  DEAL_STATUSES,
  routes,
} from 'consts';
import { wallet, transaction } from 'schemas';
import { getActionsLog } from 'helpers';
import {
  useUserApi,
  useDealApi,
  useDealsApi,
  useWalletsApi,
  useResourcesApi,
} from 'hooks/api';

/**
 * Хук для использования webSocket
 *
 * @param location { Object } Обьект, с данными об адресе пользователя
 */
export default (location) => {
  // api hooks
  const { updateNotifications } = useUserApi();
  const { updateDeals, updateDealsResults } = useDealApi();
  const {
    newDeals,
    activeDeals,
    newDealsMeta,
    activeDealsMeta,
    closedDeals,
    closedDealsMeta,
  } = useDealsApi();
  const {
    cryptoBlockHeight,
    updateCryptoBlockHeight,
  } = useResourcesApi();
  const {
    walletEntities,
    updateWalletEntities,
    transactionEntities,
    updateTransactionEntities,
  } = useWalletsApi();

  const updateWallet = useCallback((data) => {
    const { entities } = normalize(data, wallet.schema);
    updateWalletEntities(walletEntities.mergeDeep(fromJS(entities.wallet)));
  }, [walletEntities]);
  const updateBlockHeight = useCallback((data) => {
    const foundIndex = cryptoBlockHeight.findIndex(item => item.get('currencyAlias') === data.currencyAlias);
    updateCryptoBlockHeight(cryptoBlockHeight.set(foundIndex, Map(data)));
  }, [cryptoBlockHeight]);
  const updateTransaction = useCallback((data) => {
    const { entities } = normalize(data, transaction.schema);
    updateTransactionEntities(transactionEntities.mergeDeep(fromJS(entities.transaction)));
  }, [transactionEntities]);

  const onMessage = useCallback((e) => {
    // e.data - строка в формате {"type":"currentPageUpdate","payload":"2"}
    const data = JSON.parse(e.data);

    switch (data.type) {
      case WEBSOCKET_EVENT_TYPES.NOTIFICATION: {
        updateNotifications(data.data);
        break;
      }
      case WEBSOCKET_EVENT_TYPES.MODEL_CHANGE: {
        switch (data.data.type) {
          case MODEL_CHANGE_TYPES.DEAL: {
            // всегда обновляем сущность сделки (для экрана со сделкой и тд)
            updateDeals(data.data.payload);

            // выполняем действия для results только если юзер находится на экране сделок
            if (location.pathname === routes.getDealsBase()) {
              const newDeal = data.data.payload;

              let prevStatus = '';

              if (newDeals.find(D => D.get('id') === newDeal.id)) {
                prevStatus = newDeals.find(D => D.get('id') === newDeal.id).get('sellerStatus');
              }
              if (activeDeals.find(D => D.get('id') === newDeal.id)) {
                prevStatus = activeDeals.find(D => D.get('id') === newDeal.id).get('sellerStatus');
              }

              // смотрим находится ли новая/обновленная сделка в статусе спора
              const getDisputeInfo = () => {
                let disputeInfo = null;
                getActionsLog(fromJS(newDeal.actionsLog)).forEach((log) => {
                  if (log === DEAL_STATUSES.DISPUTE_END) {
                    disputeInfo = DEAL_STATUSES.DISPUTE_END;
                  }
                });

                return disputeInfo;
              };

              const disputeInfo = getDisputeInfo();
              let dealStatus = '';

              // определяем статус новой/обновленной сделки
              if (['process', 'created'].includes(newDeal.disputeStatus)) {
                dealStatus = DEAL_STATUSES.DISPUTE_START;
              } else if (disputeInfo) {
                dealStatus = disputeInfo.status;
              } else {
                dealStatus = newDeal.sellerStatus;
              }

              // в зависимости от статуса и новая ли это сделка
              // и изменился ли статус обновляем results
              if (prevStatus !== newDeal.sellerStatus) {
                switch (dealStatus) {
                  case DEAL_STATUSES.INITIALIZED:
                  case DEAL_STATUSES.PRE_INITIALIZED: {
                    let newResults = newDeals.size ? newDeals.map(D => D.get('id')) : List();
                    let newMetaResults = newDealsMeta.size ? newDealsMeta : Map();

                    if (!newResults.includes(newDeal.id)) {
                      newResults = newResults.push(newDeal.id);
                      newMetaResults = newMetaResults.set('amount', newMetaResults.amount + 1 || 1);
                    }
                    updateDealsResults(newResults, newMetaResults, 'new');
                    break;
                  }
                  case DEAL_STATUSES.CREATED:
                  case DEAL_STATUSES.DISPUTE_START: {
                    let activeResults = activeDeals.size ? activeDeals.map(D => D.get('id')) : List();
                    let activeMetaResults = activeDealsMeta.size ? activeDealsMeta : Map();

                    if (prevStatus && newDeals.size) {
                      const newResults = newDeals
                        .filter(D => D.get('id') !== newDeal.id)
                        .map(D => D.get('id'));
                      const newMetaResults = newDealsMeta.set('amount', newDealsMeta.get('amount', 1) - 1);

                      updateDealsResults(newResults, newMetaResults, 'new');
                    }
                    if (!activeResults.includes(newDeal.id)) {
                      activeResults = activeResults.unshift(newDeal.id);
                      activeMetaResults = activeMetaResults.set('amount', activeMetaResults.amount + 1 || 1);
                    }

                    updateDealsResults(activeResults, activeMetaResults, 'active');
                    break;
                  }
                  case DEAL_STATUSES.UNRATED:
                  case DEAL_STATUSES.RATED:
                  case DEAL_STATUSES.DISPUTE_END:
                  case DEAL_STATUSES.CANCELED:
                  case DEAL_STATUSES.OUTDATED: {
                    let closedResults = closedDeals.size ? closedDeals.map(D => D.get('id')) : List();
                    let closedMetaResults = closedDealsMeta.size ? closedDealsMeta : Map();

                    if (prevStatus && (activeDeals.size || newDeals.size)) {
                      if ([DEAL_STATUSES.INITIALIZED, DEAL_STATUSES.PRE_INITIALIZED]
                        .includes(prevStatus)) {
                        const newResults = newDeals
                          .filter(D => D.get('id') !== newDeal.id)
                          .map(D => D.get('id'));
                        const newMetaResults = newDealsMeta.set('amount', newDealsMeta.get('amount', 1) - 1);

                        updateDealsResults(newResults, newMetaResults, 'new');
                      } else {
                        const activeResults = activeDeals
                          .filter(D => D.get('id') !== newDeal.id)
                          .map(D => D.get('id'));
                        const activeMetaResults = activeDealsMeta.set('amount', activeDealsMeta.get('amount', 1) - 1);

                        updateDealsResults(activeResults, activeMetaResults, 'active');
                      }
                    }
                    if (!closedResults.includes(newDeal.id)) {
                      closedResults = closedResults.unshift(newDeal.id);
                      closedMetaResults = closedMetaResults.set('amount', closedMetaResults.amount + 1 || 1);
                    }

                    updateDealsResults(closedResults, closedMetaResults, 'closed');
                    break;
                  }
                  default: break;
                }
              }
            }
            break;
          }
          case MODEL_CHANGE_TYPES.WALLET: {
            updateWallet(data.data.payload);
            break;
          }
          case MODEL_CHANGE_TYPES.BLOCK_HEIGHT: {
            const [, , lastPath] = location.pathname.split('/');

            // обновляем в стори информацию, только если пользователь
            // находится на таких экранах: кошелек, дашборд, сделка
            if (location.pathname === routes.getSingleDeal({ dealId: lastPath })
              || location.pathname === routes.getDashboardBase()
              || location.pathname === routes.getWallet({ walletId: lastPath })) {
              updateBlockHeight(data.data.payload);
            }
            break;
          }
          case MODEL_CHANGE_TYPES.TRANSACTION: {
            updateTransaction(data.data.payload);
            break;
          }
          default: break;
        }
        break;
      }
      default: break;
    }

    return data;
  }, [
    updateNotifications,
    updateDeals,
    updateWallet,
    updateBlockHeight,
    updateTransaction,
    location,
  ]);

  return { onMessage };
};
