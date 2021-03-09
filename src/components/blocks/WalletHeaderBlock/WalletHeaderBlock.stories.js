import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import WalletHeaderBlock from './index';
import {number, text} from '@storybook/addon-knobs';

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Wallet header', () => (
    <WalletHeaderBlock
      amount={number('amount', 0.0033)}
      currency={text('currency', 'BTC')}
      lockedAmount={number('lockedAmount', 0.1)}
      onReceive={action('onReceive')}
      onSend={action('onSend')}
      currencyIcon={text(
        'currencyIcon',
        'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
      )}
    />
  ));
