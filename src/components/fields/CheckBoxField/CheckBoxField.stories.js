import React from 'react';
import {boolean, text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';

import CenterView from '../../../../storybook/stories/CenterView';
import CheckBoxField from './index';
import WithReduxForm from '../../../../storybook/stories/WithReduxForm';
import {Field} from 'redux-form';

storiesOf('Инпуты', module)
  .addDecorator(getStory => <WithReduxForm>{getStory()}</WithReduxForm>)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

  .add('Чекбокс', () => (
    <Field
      name="fieldName"
      component={CheckBoxField}
      input={{onChange: action('OnChange'), value: true}}
      props={{
        label: text('Label', 'Я принимаю условия Пользовательского соглашения'),
      }}
      type="checkbox"
    />
  ));
