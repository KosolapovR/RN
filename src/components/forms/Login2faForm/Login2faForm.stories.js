import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import Login2faForm from './index';

storiesOf('Формы', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Форма входа по 2FA коду', () => (
    <Login2faForm
      handleSubmit={action('handleSubmit')}
      onEnterWithRecoveryCodes={action('onEnterWithRecoveryCodes')}
    />
  ));
