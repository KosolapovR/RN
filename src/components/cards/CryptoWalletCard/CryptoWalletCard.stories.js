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
      additionalInfo={text('additionalInfo', '202.73232323 BTC')}
      icon={text('icon', 'https://pngicon.ru/file/uploads/ikonka-bitkoin.png')}
      onClickReceiveMoney={action('onClickReceiveMoney')}
      onClickSendMoney={action('onClickSendMoney')}
      onClickWallet={action('onClickWallet')}
    />
  ));
