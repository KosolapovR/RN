// @flow
import * as React from 'react';
import {ScreenWrapper} from 'components/styled';
import DashboardCryptoWalletList from 'components/lists/DashboardCryptoWalletsList';

const DashboardScreen = () => {
  return (
    <ScreenWrapper>
      <DashboardCryptoWalletList />
    </ScreenWrapper>
  );
};

export default DashboardScreen;
