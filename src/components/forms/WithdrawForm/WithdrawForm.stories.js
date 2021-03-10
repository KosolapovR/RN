import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import WithdrawFrom from './index';

storiesOf('Формы', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Форма вывода средств', () => (
    <WithdrawFrom handleSubmit={action('handleSubmit')} />
  ));
