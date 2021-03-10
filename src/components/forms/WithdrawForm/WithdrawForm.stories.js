import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import WithdrawFrom from './index';
import ImportedWalletIcon from 'assets/img/w-import.svg';

const currencies = [
  {
    id: '1',
    alias: 'BTC',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
  },
  {
    id: '2',
    alias: 'ETH',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:45:47Z_c7c004.png',
  },
  {
    id: '3',
    alias: 'TON',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-02-17T15:09:09Z_bde967.jpg',
  },
  {
    id: '4',
    alias: 'USDT',
    icon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:50:58Z_4598c9.png',
  },
];
const wallets = [
  {
    id: '1',
    address: '1tb1qwcx5er3ltqd9juhzk7kw5ualqfqepsufkfmnr3',
    icon: (
      <ImportedWalletIcon width={20} height={20} style={{marginRight: 10}} />
    ),
  },
];
storiesOf('Формы', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Форма вывода средств', () => (
    <WithdrawFrom
      handleSubmit={action('handleSubmit')}
      wallets={wallets}
      currencies={currencies}
      mainerCommission={0.0001}
    />
  ));
