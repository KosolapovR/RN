import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import React from 'react';
import AboutMeBlock from './index';
import {text} from '@storybook/addon-knobs';

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Обо мне', () => (
    <AboutMeBlock
      text={text(
        'text',
        'Он-лайн 24/7. Обмены произвожу максимально быстро. В течение 5-10 минут.',
      )}
    />
  ));
