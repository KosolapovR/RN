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
      minConfirmations={number('minConfirmations', 10)}
      countOfConfirmations={('countOfConfirmations', 3)}
      currency={'BTC'}
      hash="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
      address="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
      partnerAddress="LVGbddKk3uKhqfGKz7X7n6dTZbEHE832y"
      dealNumber={2}
      dealId="2"
      onClose={action('onClose')}
    />
  ));
