import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {text, boolean, date} from '@storybook/addon-knobs';
import React from 'react';
import NotificationItem from './index';

import ClockIcon from 'assets/img/notifications/n-logged-white.svg';

storiesOf('Карточки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Уведомление', () => (
    <NotificationItem
      getNotificationIcon={() => <ClockIcon width={20} height={20} />}
      getNotificationText={() => text('Text', 'Вход в систему')}
      notification={{
        date: date('date'),
        readed: boolean('readed', false),
      }}
    />
  ));
