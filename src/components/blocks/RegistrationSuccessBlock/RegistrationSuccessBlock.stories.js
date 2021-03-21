import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import React from 'react';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import RegistrationSuccessBlock from './index';

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Успешная регистрация', () => (
    <RegistrationSuccessBlock
      onSignIn={action('onSignIn')}
      openMailURL={action('openMailURL')}
      mailService={text('mailService', 'mail.ru')}
    />
  ));
