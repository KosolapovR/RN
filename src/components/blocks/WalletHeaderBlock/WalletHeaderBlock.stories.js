import {storiesOf} from '@storybook/react-native';
import CenterView from '../../../../storybook/stories/CenterView';
import {action} from '@storybook/addon-actions';
import React from 'react';
import {View} from 'react-native';
import PopoverContent from './index';
import PauseIcon from '../../../assets/img/offer/pause-grey.svg';
import CopyIcon from '../../../assets/img/copy-grey.svg';
import EditIcon from '../../../assets/img/edit-mobile.svg';
import {WhiteText} from '../../styled';

const popoverItems = [
  {
    id: 1,
    element: (
      <>
        <PauseIcon width={15} height={15} marginRight={10} />
        <View>
          <WhiteText>Приостановить объявление</WhiteText>
        </View>
      </>
    ),
    onClick: action('onClick'),
  },
  {
    id: 2,
    element: (
      <>
        <CopyIcon width={15} height={15} marginRight={10} />
        <View>
          <WhiteText>Скопировать ссылку</WhiteText>
        </View>
      </>
    ),
    onClick: action('onClick'),
  },
  {
    id: 3,
    element: (
      <>
        <EditIcon width={15} height={15} marginRight={10} />
        <View>
          <WhiteText>Редактировать</WhiteText>
        </View>
      </>
    ),
    onClick: action('onClick'),
  },
];

storiesOf('Блоки', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Блок popover', () => <PopoverContent items={popoverItems} />);
