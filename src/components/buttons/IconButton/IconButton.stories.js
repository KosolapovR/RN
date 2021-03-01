import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import IconButton from './index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

storiesOf('Кнопки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Кнопка с иконкой', () => (
    <IconButton
      icon={<FontAwesome5 name="home" size={16} color={'#b1b1b1'} />}
      onClick={action('onClick')}
      containerStyles={{alignSelf: 'center'}}
    />
  ));
