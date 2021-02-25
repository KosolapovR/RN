import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import RegistrationForm from './index';

storiesOf('Формы', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Форма регистрации', () => (
    <RegistrationForm handleSubmit={action('handleSubmit')} />
  ));
