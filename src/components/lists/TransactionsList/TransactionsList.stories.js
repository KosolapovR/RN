import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import TransactionsList from './index';

const transactions = [
  {
    id: 1,
    type: 'transfer-from',
    createdDate: '25.05.19, 19:46',
    amount: 0.00034,
    amountInUSD: 1.98,
    currency: 'BTC',
  },
  {
    id: 2,
    type: 'transfer-from',
    createdDate: '25.05.19, 19:46',
    amount: 0.00034,
    amountInUSD: 1.98,
    currency: 'USDT',
  },
  {
    id: 3,
    type: 'transfer-to',
    createdDate: '25.05.19, 19:46',
    amount: 23.12312,
    amountInUSD: 1233.98,
    currency: 'ETH',
    dealNumber: 23,
  },
  {
    id: 4,
    type: 'transfer-from',
    createdDate: '25.05.19, 19:46',
    amount: 0.00034,
    amountInUSD: 1.98,
    currency: 'BTC',
  },
  {
    id: 5,
    type: 'transfer-from',
    createdDate: '25.05.19, 19:46',
    amount: 0.00034,
    amountInUSD: 1.98,
    currency: 'USDT',
    dealNumber: 234,
  },
  {
    id: 6,
    type: 'transfer-to',
    createdDate: '25.05.19, 19:46',
    amount: 23.12312,
    amountInUSD: 1233.98,
    currency: 'ETH',
  },
];

storiesOf('Списки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Список транзакций на дашборде', () => (
    <TransactionsList transactions={transactions} />
  ));
