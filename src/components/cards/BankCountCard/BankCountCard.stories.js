import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import React from 'react';
import BankCountCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Банковская карта', () => (
    <BankCountCard
      bankName={text('bankName', 'Сбербанк')}
      additionalInfo={text(
        'additionalInfo',
        '4276 4500 0000 1267 Для торговли',
      )}
      icon={text(
        'icon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      onClick={action('onClick')}
      currency={text('currency', 'RUB')}
    />
  ));
