import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import React from 'react';
import TermsOfUseBlock from './index';

const terms = [
  {
    createdAt: '2020-12-21T09:02:31.202Z',
    id: '5fe064e3fae9796130831a96',
    key: '79N155kalCzf1lhc',
    langs: ['en'],
    version: '1',
  },
  {
    createdAt: '2021-02-15T09:02:31.202Z',
    id: '5fe064e3fae9796130831a97',
    key: '79N155kalCzf1lhc',
    langs: ['ru', 'en'],
    version: '2',
  },
];
storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Пользовательское соглашение', () => <TermsOfUseBlock terms={terms} />);
