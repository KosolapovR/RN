import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import {date, number, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import TransactionModal from './index';

storiesOf('Модалки', module)
  .addDecorator((getStory) => <CenterView black>{getStory()}</CenterView>)
  .add('Транзакция', () => (
    <TransactionModal
      type={select(
        'type',
        {
          ['transfer-to']: 'transfer-to',
          ['transfer-from']: 'transfer-from',
        },
        'transfer-to',
      )}
      amount={number('amount', 0.00321)}
      amountInUSD={number('amountInUSD', 1.98)}
      date="2021-03-02T15:57:21.781Z"
      minConfirmations={number('minConfirmations', 10)}
      countOfConfirmations={number('countOfConfirmations', 3)}
      currency={text('currency', 'BTC')}
      hash="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
      address="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
      partnerAddress="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
      dealNumber={number('dealNumber', 0)}
      dealId={text('dealId')}
      onClose={action('onClose')}
      fromUserId={text('fromUserId')}
      fromUsername={text('fromUsername')}
      toUserId={text('toUserId')}
      toUsername={text('toUsername')}
      goToBlockchainExplorer={select(
        'goToBlockchainExplorer',
        {
          func: () => {},
          null: null,
        },
        action('goToBlockchainExplorer'),
      )}
    />
  ));
