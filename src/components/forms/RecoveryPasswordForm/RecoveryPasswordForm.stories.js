import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import RecoveryForm from './index';

storiesOf('Формы', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Форма восстановления пароля', () => (
    <RecoveryForm handleSubmit={action('handleSubmit')} />
  ));
