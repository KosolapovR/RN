import { useMemo } from 'react';
import { cropNumberToN } from '../helpers';
import store from '../configureStore';

export default (walletRefundID) => {
  const walletRefundBalanceFree = useMemo(() => {
    const wallets = store.getState().get('entities').get('wallet');

    if (wallets && wallets.size) {
      const wallet = wallets.find(w => w.get('id') === walletRefundID);
      if (wallet) return cropNumberToN(wallet.get('balanceFree'), wallet.get('digitsAlias'), false, true);
    }

    return 0;
  }, [walletRefundID]);

  return {
    balanceFree: walletRefundBalanceFree,
  };
};
