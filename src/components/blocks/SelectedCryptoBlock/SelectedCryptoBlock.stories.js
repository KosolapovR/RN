import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import SelectedCryptoBlock from './index';
import {number, text} from '@storybook/addon-knobs';
const items = [
  {
    id: 1,
    currency: 'BTC',
    currencyIcon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
  },
  {
    id: 2,
    currency: 'TON',
    currencyIcon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-02-17T15:09:09Z_bde967.jpg',
  },
  {
    id: 3,
    currency: 'USDT',
    currencyIcon:
      'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:50:58Z_4598c9.png',
  },
];

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Избранная криптовалюта', () => <SelectedCryptoBlock items={items} />);
