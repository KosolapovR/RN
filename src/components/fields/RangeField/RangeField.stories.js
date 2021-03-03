import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import RangeField from './index';
import {text} from '@storybook/addon-knobs';

storiesOf('Инпуты', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Range', () => (
    <RangeField
      label={text('label', 'Курс (ETH)')}
      min={420000}
      max={480000}
      step={1}
      isDisabled={true}
    />
  ));
