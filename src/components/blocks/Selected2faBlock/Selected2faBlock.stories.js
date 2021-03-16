import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import React from 'react';
import Selected2faBlock from './index';
import AppIcon from 'assets/img/2fa-mobile.svg';
import AppSelectedIcon from 'assets/img/2fa-active.svg';
import TelegramIcon from 'assets/img/new-settings/telegram-grey.svg';
import TelegramSelectedIcon from 'assets/img/new-settings/telegram-active.svg';

const items = [
  {
    id: 1,
    title: '2FA App',
    subtitle: 'Authy/Google Authenticator',
    icon: <AppIcon height={25} width={25} />,
    isSelected: true,
    selectedIcon: <AppSelectedIcon height={25} width={25} />,
  },
  {
    id: 2,
    title: 'Telegram',
    subtitle: 'Push-уведомления',
    icon: <TelegramIcon height={23} width={23} />,
    isSelected: false,
    selectedIcon: <TelegramSelectedIcon height={23} width={23} />,
  },
];

const onSelect = (id) => {
  items.forEach((item) => {
    item.isSelected = item.id === id;
  });
};
storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Выбранный способ 2FA', () => (
    <Selected2faBlock items={items} onSelect2FA={onSelect} />
  ));
