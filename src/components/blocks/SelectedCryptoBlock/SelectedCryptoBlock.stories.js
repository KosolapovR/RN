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
    currencyIcon: 'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
  },
  {
    id: 2,
    currency: 'TON',
    currencyIcon:
      'http://proxy.ton.services/service-buckets/file/payment/5f7efc9093c208a9a6df985c_2020-12-31T07:07:02Z_a66d95.jpeg',
  },
  {
    id: 3,
    currency: 'USDT',
    currencyIcon:
      'http://proxy.ton.services/service-buckets/file/payment/5f72545a1a67f552a048c810_2020-12-17T16:33:09Z_0b22ad.png',
  },
];

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Избранная криптовалюта', () => <SelectedCryptoBlock items={items} />);
