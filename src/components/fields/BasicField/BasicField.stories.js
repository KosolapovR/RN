import React from 'react';
import {boolean, text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';
import {Field} from 'redux-form';

import CenterView from '../../../../storybook/stories/CenterView';
import BasicField from './index';
import SearchIcon from '../../../assets/img/search-white.svg';
import CopyIcon from '../../../assets/img/copy-grey.svg';
import WithReduxForm from '../../../../storybook/stories/WithReduxForm';

storiesOf('Инпуты', module)
  .addDecorator((getStory) => <WithReduxForm>{getStory()}</WithReduxForm>)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Обычный инпут', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        placeholder: text('Placeholder', 'Введите значение'),
        input: {onChange: action('OnChange')},
        label: text('Label', 'Ваше имя:'),
        isDisabled: boolean('Disabled', false),
        withError: false,
      }}
      type="text"
    />
  ))
  .add('Инпут с ошибкой', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        placeholder: text('Placeholder', 'Введите значение'),
        input: {onChange: action('OnChange')},
        label: text('Label', 'Ваше имя:'),
        isDisabled: boolean('Disabled', false),
        meta: {
          error: text('Error text', 'неверное значение'),
          touched: true,
          valid: false,
          pristine: false,
        },
        withError: true,
      }}
      type="text"
    />
  ))
  .add('Инпут с защитой', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        placeholder: text('Placeholder', 'Введите пароль'),
        input: {onChange: action('OnChange')},
        label: text('Label', 'Пароль:'),
        isDisabled: boolean('Disabled', false),
        meta: {
          error: '',
        },
        isSecurity: true,
      }}
      type="text"
    />
  ))
  .add('Инпут с дополнительной информацией', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        placeholder: text('Placeholder', 'Введите сумму'),
        input: {onChange: action('OnChange')},
        label: text('Label', 'ETH:'),
        isDisabled: boolean('Disabled', false),
        meta: {
          error: text('Error text', 'неверное значение'),
          touched: true,
          valid: false,
          pristine: false,
        },
        withError: boolean('Show error', false),
        additionalInfo: text('Additional Info', '0,0013 BTC'),
      }}
      type="text"
    />
  ))
  .add('Инпут только чтение', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        readOnly: true,
        placeholder: text('Placeholder', 'Введите сумму'),
        input: {
          onChange: action('OnChange'),
          value: text(
            'ReadOnly value',
            '0x13mfsdj123kjhadsf;mlhoi347tcgkl1asd1j8ygalksasdasd2jh',
          ),
        },
        label: text('Label', 'Ваш биткоин адрес:'),
        isDisabled: boolean('Disabled', false),
        meta: {
          error: '',
        },
      }}
      type="text"
    />
  ))
  .add('Инпут с символом слева', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        input: {
          onChange: action('OnChange'),
        },
        label: text('Label', 'Поиск:'),
        isDisabled: boolean('Disabled', false),
        meta: {},
        leftSymbol: <SearchIcon style={{opacity: 0.8}} />,
      }}
      type="text"
    />
  ))
  .add('Инпут с символом справа', () => (
    <Field
      name="fieldName"
      component={BasicField}
      props={{
        input: {
          onChange: action('OnChange'),
        },
        meta: {},
        rightSymbol: <CopyIcon style={{opacity: 0.8}} />,
        onClickRightSymbol: action('onClickRightSymbol'),
      }}
      type="text"
    />
  ));
