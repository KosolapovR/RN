import React from 'react';
import {Text, View} from 'react-native';
import {boolean, text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {Field} from 'redux-form';

import CenterView from '../../../../storybook/stories/CenterView';
import WithReduxForm from '../../../../storybook/stories/WithReduxForm';
import DropdownField from './index';

storiesOf('Инпуты', module)
  .addDecorator((getStory) => <WithReduxForm>{getStory()}</WithReduxForm>)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Дропдаун', () => (
    <Field
      name="fieldName"
      component={DropdownField}
      input={{onChange: action('onChange')}}
      props={{
        zIndex: 1,
        placeholder: text('Placeholder', 'Выберите кошелек'),
        isDisabled: boolean('Disabled', false),
        label: text('Label', 'Выбор валюты1:'),
        readOnly: boolean('readOnly', false),
        dropdownItems: [
          {
            id: 1,
            element: <Text style={{color: '#b5b5b5'}}>BTC</Text>,
            value: 'BTC',
          },
          {
            id: 2,
            element: <Text style={{color: '#b5b5b5'}}>ETH</Text>,
            value: 'ETH',
          },
          {
            id: 3,
            element: <Text style={{color: '#b5b5b5'}}>TON</Text>,
            value: 'TON',
          },
          {
            id: 4,
            element: <Text style={{color: '#b5b5b5'}}>USDT</Text>,
            value: 'USDT',
          },
        ],
      }}
      type="text"
    />
  ));
