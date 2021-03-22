import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import {number, text} from '@storybook/addon-knobs';
import RecoveryCodesBlock from './index';
//v7qgW-2jlIe
// BVubg-6E9qb
// 4PftN-50JZq
// SCZSt-d20ox
// iKpma-uII0H
storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Recovery codes', () => (
    <RecoveryCodesBlock
      codes={[
        'v7qgW-2jlIe',
        'BVubg-6E9qb',
        '4PftN-50JZq',
        'SCZSt-d20ox',
        'iKpma-uII0H',
        'v7qgW-2jlIe',
        'BVubg-6E9qb',
        '4PftN-50JZq',
        'SCZSt-d20ox',
        'iKpma-uII0H',
      ]}
    />
  ));
