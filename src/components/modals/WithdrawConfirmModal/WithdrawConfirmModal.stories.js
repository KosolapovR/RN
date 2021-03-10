import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import {boolean, date, number, select, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import TransactionModal from './index';
import WithdrawConfirmModal from './index';

storiesOf('Модалки', module)
  .addDecorator((getStory) => <CenterView black>{getStory()}</CenterView>)
  .add('Вывод средств', () => (
    <WithdrawConfirmModal
      onClose={action('onClose')}
      onConfirm={action('onConfirm')}
      currency={text('currency', 'BTC')}
      partnerAddress={text(
        'partnerAddress',
        '3LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y',
      )}
      amount={number('amount', 3.56789032)}
      mainerCommission={number('mainerCommission', 0.000033)}
      withMainerCommission={boolean('withMainerCommission', true)}
      currencyIcon={text(
        'currencyIcon',
        'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
      )}
    />
  ));
