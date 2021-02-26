import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import React from 'react';
import DealCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Карточка новой сделки', () => (
    <DealCard
      sellAmount={text('sellAmount', '0.02345678 BTC')}
      sellWalletIcon={text(
        'sellWalletIcon',
        'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
      )}
      buyAmount={text('buyAmount', '500 000 RUB')}
      buyWalletIcon={text(
        'buyWalletIcon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      timerValue={text('timerValue', '00:59')}
      dealStatusText={text('dealStatusText', 'Новая заявка')}
      additionalInfo={text('additionalInfo', 'от Ivan Ivanov')}
      onAccept={action('onAccept')}
      onReject={action('onReject')}
    />
  ))
  .add('Карточка сделки в ожидании', () => (
    <DealCard
      sellAmount={text('sellAmount', '0.02345678 BTC')}
      sellWalletIcon={text(
        'sellWalletIcon',
        'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
      )}
      buyAmount={text('buyAmount', '500 000 RUB')}
      buyWalletIcon={text(
        'buyWalletIcon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      dealStatusText={text('dealStatusText', 'Шаг 1/4')}
      isWaitingConfirm={true}
      additionalInfo={text('additionalInfo', 'Ожидание подтверждения')}
      onAccept={action('onAccept')}
      onReject={action('onReject')}
    />
  ))
  .add('Карточка сделки с истекшим сроком', () => (
    <DealCard
      sellAmount={text('sellAmount', '0.02345678 BTC')}
      sellWalletIcon={text(
        'sellWalletIcon',
        'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
      )}
      buyAmount={text('buyAmount', '500 000 RUB')}
      buyWalletIcon={text(
        'buyWalletIcon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      isOutdated={true}
      onFindSimilarOffers={action('onFindSimilarOffers')}
    />
  ))
  .add('Карточка отмененной сделки', () => (
    <DealCard
      sellAmount={text('sellAmount', '0.02345678 BTC')}
      sellWalletIcon={text(
        'sellWalletIcon',
        'https://pngicon.ru/file/uploads/ikonka-bitkoin.png',
      )}
      buyAmount={text('buyAmount', '500 000 RUB')}
      buyWalletIcon={text(
        'buyWalletIcon',
        'https://cdn.icon-icons.com/icons2/1385/PNG/512/sberbank-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95564.png',
      )}
      dealStatusText={text('dealStatusText', 'Шаг 1/4')}
      isCanceled={true}
      additionalInfo={text('additionalInfo', 'Ожидание подтверждения')}
      onFindSimilarOffers={action('onFindSimilarOffers')}
    />
  ));
