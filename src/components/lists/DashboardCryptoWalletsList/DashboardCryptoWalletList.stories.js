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
    walletName: 'ETH',
    additionalInfo: '1.13483343 ETH',
    icon:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fru.m.wikipedia.org%2Fwiki%2F%25D0%25A4%25D0%25B0%25D0%25B9%25D0%25BB%3AETHEREUM-YOUTUBE-PROFILE-PIC.png&psig=AOvVaw23NIYhzcXdKJFAo0KlmgMj&ust=1614958657725000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCB9fr7lu8CFQAAAAAdAAAAABAI',
    onClickWallet: action('onClick'),
  },
  {
    id: 3,
    walletName: 'USDT',
    additionalInfo: '8320.32 USDT',
    icon: 'https://4bitcoin.co.uk/wp-content/uploads/2018/06/Tether-Logo.png',
    onClickWallet: action('onClick'),
  },
];

storiesOf('Списки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Списко кошельков на дашборде', () => (
    <DashboardCryptoWalletList wallets={wallets} />
  ));
