import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {text, number, select} from '@storybook/addon-knobs';
import React from 'react';
import TransactionItemCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Транзакция с переводом', () => (
    <TransactionItemCard
      type={select(
        'type',
        {
          'transfer-from': 'transfer-from',
          'transfer-to': 'transfer-to',
        },
        'transfer-from',
      )}
      createdDate={text('createdDate', '25.05.19, 19:46')}
      amount={number('amount', 0.00034)}
      amountInUSD={number('amountInUSD', 1.98)}
      currency={text('currency', 'BTC')}
    />
  ))
  .add('Транзакция по сделке', () => (
    <TransactionItemCard
      type={select(
        'type',
        {
          'transfer-from': 'transfer-from',
          'transfer-to': 'transfer-to',
        },
        'transfer-from',
      )}
      createdDate={text('createdDate', '25.05.19, 19:46')}
      amount={number('amount', 0.00034)}
      amountInUSD={number('amountInUSD', 1.98)}
      dealNumber={number('dealNumber', 233)}
      currency={text('currency', 'BTC')}
    />
  ));
