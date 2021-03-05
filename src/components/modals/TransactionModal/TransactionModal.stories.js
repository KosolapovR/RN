import React from 'react';
import {storiesOf} from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import {number, text} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import TransactionModal from './index';

storiesOf('Модалки', module)
  .addDecorator((getStory) => <CenterView black>{getStory()}</CenterView>)
  .add('Транзакция', () => (
    <TransactionModal
      type="transfer-to"
      amount={0.00321}
      amountInUSD={1.98}
      date="2021-03-02T15:57:21.781Z"
      minConfirmations={10}
      countOfConfirmations={1234}
      currency={'BTC'}
      hash="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
    />
  ));
