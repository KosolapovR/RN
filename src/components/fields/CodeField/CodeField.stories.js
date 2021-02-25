import React from 'react';
import {boolean, text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';

import CenterView from '../../../../storybook/stories/CenterView';
import CodeField from './index';

storiesOf('Инпуты', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

  .add('Инпут для введения кода', () => (
    <CodeField
      label={text('Label', 'Введите код из своего 2FA приложения:')}
      onFinishCheckingCode={action('onFinishCheckingCode')}
    />
  ));
