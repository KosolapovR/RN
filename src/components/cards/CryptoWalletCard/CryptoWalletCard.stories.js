import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {ScrollView, View} from 'react-native';
import {text} from '@storybook/addon-knobs';
import React from 'react';
import CryptoWalletCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Карточка криптокошелка', () => (
    <CryptoWalletCard
      walletName={text('walletName', 'Bitcoin')}
      balanceFree={text('balanceFree', '202.73232323 BTC')}
      balanceFrozen={text('balanceFrozen', '0.73232323 BTC')}
      icon={text(
        'icon',
        'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
      )}
      onClickReceiveMoney={action('onClickReceiveMoney')}
      onClickSendMoney={action('onClickSendMoney')}
      onClickWallet={action('onClickWallet')}
    />
  ))
  .add('Карточка криптокошелка на дашборде', () => (
    <CryptoWalletCard
      walletName={text('walletName', 'Bitcoin')}
      additionalInfo={text('additionalInfo', '202.73232323 BTC')}
      icon={text(
        'icon',
        'https://proxy.onplat.ru/service-buckets/file/payment/5fedcd3307567bf6600aec43_2021-01-11T11:46:47Z_6b5879.png',
      )}
      onClickWallet={action('onClickWallet')}
      isDashboard={true}
    />
  ));
