import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {text} from '@storybook/addon-knobs';
import React from 'react';
import MarketItemCard from './index';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Карточка оффера на рынке', () => (
    <MarketItemCard
      isOwn={false}
      isOwnerOnline={true}
      ownerName="Ivan Ivanov"
      dealsCount={152}
      rating={5.0}
      directionsInfo="BTC/RUB"
      reaction={1109123}
      rateInfo={text('rateInfo', '2 590 000 RUB')}
      limitsInfo={text('limitsInfo', '1 000 RUB - 300 000 RUB')}
    />
  ))
  .add('Карточка своего оффера на рынке', () => (
    <MarketItemCard
      isOwn={true}
      dealsCount={152}
      rating={3.9}
      directionsInfo="BTC/RUB"
      reaction={1800000}
      rateInfo={text('rateInfo', '2 590 000 RUB')}
      limitsInfo={text('limitsInfo', '1 000 RUB - 300 000 RUB')}
    />
  ));
