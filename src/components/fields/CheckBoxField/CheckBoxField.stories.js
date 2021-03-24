import React from 'react';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';

import CenterView from '../../../../storybook/stories/CenterView';
import CheckBoxField from './index';

storiesOf('Инпуты', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Чекбокс', () => (
    <CheckBoxField
      label={text('Label', 'Я принимаю условия Пользовательского соглашения')}
    />
  ));
