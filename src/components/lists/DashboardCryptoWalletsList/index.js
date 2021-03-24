// @flow
import React from 'react';
import {ScrollView, View} from 'react-native';
import CryptoWalletCard from 'components/cards/CryptoWalletCard';
import {SecondaryBoldText} from 'components/styled';

const DashboardCryptoWalletList = ({
  wallets,
}: {
  wallets: Array<{
    id: string,
    walletName: string,
    icon: string,
    additionalInfo: string,
    onClickWallet: Function,
    isDashboard?: boolean,
  }>,
}) => {
  const handleWalletClick = () => {};
  return (
    <View>
      <SecondaryBoldText paddingBottom={15}>Мои кошельки</SecondaryBoldText>
      <ScrollView horizontal>
        {wallets.map((w) => (
          <CryptoWalletCard
            key={w.id}
            walletName={w.walletName}
            icon={w.icon}
            additionalInfo={w.additionalInfo}
            isDashboard={true}
            onClickWallet={handleWalletClick}
          />
        ))}
      </ScrollView>
    </View>
  );
};

DashboardCryptoWalletList.defaultProps = {
  wallets: [],
};

export default DashboardCryptoWalletList;
