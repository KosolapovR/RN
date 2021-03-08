import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import ProfileTopBlock from './index';
import {number, text} from '@storybook/addon-knobs';

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Profile avatar block', () => (
    <ProfileTopBlock
      userName={text('userName', '@RomanFront')}
      onEdit={action('onEdit')}
      dealsCount={number('dealsCount', 19)}
      commentsCount={number('commentsCount', 10)}
      rating={number('rating', 5.0)}
    />
  ));
