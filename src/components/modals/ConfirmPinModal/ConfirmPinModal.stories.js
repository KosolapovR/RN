import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import {number, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import ConfirmPinModal from './index';

storiesOf('Модалки', module)
  .addDecorator((getStory) => <CenterView black>{getStory()}</CenterView>)
  .add('Подтверждение PIN', () => <ConfirmPinModal />);
