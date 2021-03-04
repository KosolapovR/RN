import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../storybook/stories/CenterView';
import MarketFilter from './index';
import {number, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';

storiesOf('Фильтр', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Обычный', () => (
    <MarketFilter
      currencyAlias={text('currencyAlias', 'ETH')}
      onFilter={action('onFilter')}
      onClose={action('onClose')}
      availableMinRate={number('availableMinRate', 420000)}
      availableMaxRate={number('availableMaxRate', 499999)}
      availableMinResponseTime={number('availableMinResponseTime', 0)}
      availableMaxResponseTime={number('availableMaxResponseTime', 60)}
      availableMinDealsCount={number('availableMinDealsCount', 0)}
      availableMaxDealsCount={number('availableMaxDealsCount', 150)}
    />
  ));
