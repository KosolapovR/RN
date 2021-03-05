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
    icon: 'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
    onClickWallet: action('onClick'),
  },
  {
    id: 2,
    walletName: 'TON',
    additionalInfo: '1.13483343 TON',
    icon:
      'http://proxy.ton.services/service-buckets/file/payment/5f7efc9093c208a9a6df985c_2020-12-31T07:07:02Z_a66d95.jpeg',
    onClickWallet: action('onClick'),
  },
  {
    id: 3,
    walletName: 'USDT',
    additionalInfo: '8320.32 USDT',
    icon:
      'http://proxy.ton.services/service-buckets/file/payment/5f72545a1a67f552a048c810_2020-12-17T16:33:09Z_0b22ad.png',
    onClickWallet: action('onClick'),
  },
];

storiesOf('Списки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Список кошельков на дашборде', () => (
    <DashboardCryptoWalletList wallets={wallets} />
  ));
