import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import PulsarLoader from './index';

storiesOf('Loaders', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Pulsar', () => <PulsarLoader />);
