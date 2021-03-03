import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../storybook/stories/CenterView';
import MarketFilter from './index';

storiesOf('Фильтр', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Обычный', () => <MarketFilter />);
