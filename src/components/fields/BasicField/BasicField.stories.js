import React from 'react';
import {boolean, text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import {action} from '@storybook/addon-actions';

import CenterView from '../../../../storybook/stories/CenterView';
import BasicField from './index';
import SearchIcon from '../../../assets/img/search-white.svg';
import CopyIcon from '../../../assets/img/copy-grey.svg';

storiesOf('Инпуты', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)

  .add('Обычный инпут', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите значение')}
      label={text('Label', 'Ваше имя:')}
      isDisabled={boolean('Disabled', false)}
      withError={false}
    />
  ))
  .add('Инпут с ошибкой', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите значение')}
      label={text('Label', 'Ваше имя:')}
      isDisabled={boolean('Disabled', false)}
      meta={{
        error: text('Error text', 'неверное значение'),
        touched: true,
        valid: false,
        pristine: false,
      }}
      withError={true}
    />
  ))
  .add('Инпут с защитой', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите пароль')}
      label={text('Label', 'Пароль:')}
      isDisabled={boolean('Disabled', false)}
      isSecurity={true}
    />
  ))
  .add('Инпут с дополнительной информацией', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите пароль')}
      label={text('Label', 'Пароль:')}
      isDisabled={boolean('Disabled', false)}
      additionalInfo={text('Additional Info', '0,0013 BTC')}
    />
  ))
  .add('Инпут только чтение', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите пароль')}
      label={text('Label', 'Пароль:')}
      isDisabled={boolean('Disabled', false)}
      readOnly={true}
    />
  ))
  .add('Инпут с символом слева', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите пароль')}
      label={text('Label', 'Пароль:')}
      isDisabled={boolean('Disabled', false)}
      leftSymbol={<SearchIcon style={{opacity: 0.8}} />}
    />
  ))
  .add('Инпут с символом справа', () => (
    <BasicField
      placeholder={text('Placeholder', 'Введите пароль')}
      label={text('Label', 'Пароль:')}
      isDisabled={boolean('Disabled', false)}
      rightSymbol={<CopyIcon style={{opacity: 0.8}} />}
      onClickRightSymbol={action('onClickRightSymbol')}
    />
  ));
