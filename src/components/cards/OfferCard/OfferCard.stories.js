import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {ScrollView, View} from 'react-native';
import {text} from '@storybook/addon-knobs';
import React from 'react';
import OfferCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Карточка оффера', () => (
    <OfferCard
      sellCurrency={text('sellCurrency', 'BTC')}
      sellWalletAlias={text('sellWalletAlias', 'Bitcoin')}
      sellWalletIcon={text(
        'sellWalletIcon',
        'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
      )}
      buyCurrency={text('buyCurrency', 'RUB')}
      buyWalletAlias={text('buyWalletAlias', 'Sberbank')}
      buyWalletIcon={text(
        'buyWalletIcon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      rateInfo={text('rateInfo', 'BINANCE -30% BTC / RUB 2 909 230.23')}
      limitsInfo={text('limitsInfo', '1 000 RUB - 300 000 RUB')}
    />
  ))
  .add('Карточка приостановленного оффера', () => (
    <OfferCard
      sellCurrency={text('sellCurrency', 'BTC')}
      sellWalletAlias={text('sellWalletAlias', 'Bitcoin')}
      sellWalletIcon={text(
        'sellWalletIcon',
        'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
      )}
      buyCurrency={text('buyCurrency', 'RUB')}
      buyWalletAlias={text('buyWalletAlias', 'Sberbank')}
      buyWalletIcon={text(
        'buyWalletIcon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      rateInfo={text('rateInfo', 'BINANCE -30% BTC / RUB 2 909 230.23')}
      limitsInfo={text('limitsInfo', '1 000 RUB - 300 000 RUB')}
      isPaused={true}
    />
  ));
