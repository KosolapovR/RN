import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {text, select, boolean} from '@storybook/addon-knobs';
import React from 'react';
import {View} from 'react-native';
import BasicButton from './index';

storiesOf('Кнопки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Обычная кнопка', () => (
    <View>
      <BasicButton
        color={select(
          'Color type',
          {
            Primary: 'primary',
            Secondary: 'secondary',
            Danger: 'danger',
            DangerTransparent: 'danger-transparent',
            TransparentWithBorder: 'transparent-with-border',
            None: null,
          },
          'primary',
        )}
        isDisabled={boolean('Disabled', false)}
        title={text('Button text', 'Продолжить')}
        onClick={action('onClick')}
      />
    </View>
  ));
