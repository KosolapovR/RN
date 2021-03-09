import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import DashboardCryptoWalletList from './index';

const wallets = [
  {
    id: 1,
    walletName: 'BTC',
    additionalInfo: '0.0034 BTC',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
    onClickWallet: action('onClick'),
  },
  {
    id: 2,
    walletName: 'TON',
    additionalInfo: '1.13483343 TON',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-02-17T15:09:09Z_bde967.jpg',
    onClickWallet: action('onClick'),
  },
  {
    id: 3,
    walletName: 'USDT',
    additionalInfo: '8320.32 USDT',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:50:58Z_4598c9.png',
    onClickWallet: action('onClick'),
  },
];

storiesOf('Списки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Список кошельков на дашборде', () => (
    <DashboardCryptoWalletList wallets={wallets} />
  ));
