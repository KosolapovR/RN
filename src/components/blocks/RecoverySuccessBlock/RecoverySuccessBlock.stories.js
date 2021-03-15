import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import React from 'react';
import RecoverySuccessBlock from './index';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Успешное восстановление пароля', () => (
    <RecoverySuccessBlock
      goToSignIn={action('goToSignIn')}
      openMailURL={action('openMailURL')}
      mailService={text('mailService', '@mail.ru')}
    />
  ));
