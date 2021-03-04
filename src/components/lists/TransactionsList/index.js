import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import CryptoWalletCard from 'components/cards/CryptoWalletCard';
import {SecondaryBoldText} from 'components/styled';

const DashboardCryptoWalletList = ({wallets}) => {
  const handleWalletClick = () => {};
  return (
    <View>
      <SecondaryBoldText paddingBottom={15}>Мои кошельки</SecondaryBoldText>
      <ScrollView horizontal>
        {wallets.map((w) => (
          <CryptoWalletCard
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

DashboardCryptoWalletList.propTypes = {
  wallets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      walletName: PropTypes.string.isRequired,
      additionalInfo: PropTypes.string.isRequired,
      onClickWallet: PropTypes.func.isRequired,
      isDashboard: PropTypes.bool.isRequired,
    }),
  ),
};

DashboardCryptoWalletList.defaultProps = {
  wallets: [],
};

export default DashboardCryptoWalletList;
