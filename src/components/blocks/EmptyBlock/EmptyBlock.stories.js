import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import {select} from '@storybook/addon-knobs';
import React from 'react';
import BankCountCard from './index';
import EmptyBlock from './index';

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Скелетон', () => (
    <EmptyBlock
      type={select(
        'type',
        {
          'Active deals': 'activeDeals',
          'Completed deals': 'completedDeals',
          Offers: 'offers',
          'User`s offers': 'usersOffers',
          Subscriptions: 'subscriptions',
          Notifications: 'notifications',
          'Help search': 'helpSearch',
          Null: null,
        },
        'activeDeals',
      )}
      searchWord={'Искомое слово'}
      onClick={action('onClick')}
    />
  ));
