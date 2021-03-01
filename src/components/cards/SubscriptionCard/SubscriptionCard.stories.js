import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {text, number} from '@storybook/addon-knobs';
import React from 'react';
import SubscriptionCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Подписка', () => (
    <SubscriptionCard
      description={text('description', 'Покупка BTC/Яндекс Деньги')}
      additionalInfo={text('additionalInfo', '1 BTC (\\U+003C) 690 000 RUB')}
      count={number('count', 0)}
      onEdit={action('onEdit')}
    />
  ));
