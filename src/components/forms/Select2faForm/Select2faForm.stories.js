import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import Select2faForm from './index';

storiesOf('Формы', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Форма выбора варианта 2FA', () => (
    <Select2faForm
      onSubmit={action('onSubmit')}
      onSkip={action('onSkip')}
    />
  ));
