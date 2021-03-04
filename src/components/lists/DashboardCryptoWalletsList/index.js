import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import CryptoWalletCard from 'components/cards/CryptoWalletCard';

const DashboardCryptoWalletList = ({wallets}) => {
  const handleWalletClick = () => {};
  return (
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
