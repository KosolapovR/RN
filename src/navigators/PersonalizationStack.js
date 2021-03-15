import React, {useContext, useRef, useState} from 'react';
import {View} from 'react-native';
import {useTheme} from 'styled-components';
import {createStackNavigator} from '@react-navigation/stack';
import Popover from 'react-native-popover-view';

import ProfileScreen from '../screens/ProfileScreen';
import IconButton from 'components/buttons/IconButton';
import SettingsIcon from 'assets/img/settings-white.svg';
import {SettingsTabs} from './SettingsTabs';
import PopoverContent from 'components/blocks/PopoverContent';
import {WhiteText} from 'components/styled';
import {AuthContext} from '../context/AuthContext';

const Stack = createStackNavigator();

const RightHeader = ({navigation, onSignOutClick}) => {
  const [showPopover, setShowPopover] = useState(false);
  const touchable = useRef();

  const popoverItems = [
    {
      id: 1,
      element: (
        <>
          <View>
            <WhiteText>Настройки</WhiteText>
          </View>
        </>
      ),
      onClick: () => {
        navigation.navigate('SettingsTabs');
        setShowPopover(false);
      },
    },
    {
      id: 2,
      element: (
        <>
          <View>
            <WhiteText>Выйти</WhiteText>
          </View>
        </>
      ),
      onClick: () => {
        setShowPopover(false);
        onSignOutClick();
      },
    },
  ];
  return (
    <>
      <IconButton
        backgroundTransparent
        dinamicRef={touchable}
        onClick={() => {
          setShowPopover(!showPopover);
        }}
        icon={<SettingsIcon width={40} />}
        containerStyles={{right: 20}}
      />
      <Popover
        popoverStyle={{backgroundColor: 'transparent'}}
        arrowStyle={{backgroundColor: 'transparent'}}
        backgroundStyle={{backgroundColor: 'transparent'}}
        from={touchable}
        isVisible={showPopover}
        onRequestClose={() => setShowPopover(false)}>
        <PopoverContent items={popoverItems} />
      </Popover>
    </>
  );
};

export const PersonalizationStack = ({navigation}) => {
  const theme = useTheme();
  const {signOut} = useContext(AuthContext);

  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Stack.Navigator initialRouteName={'Profile'}>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({route}) => ({
            headerRight: () => (
              <RightHeader navigation={navigation} onSignOutClick={signOut} />
            ),
            headerTitle: '',
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: theme.main.backgroundColors.primary,
              shadowOffset: {height: 0, width: 0},
            },
          })}
        />
        <Stack.Screen name="SettingsTabs" component={SettingsTabs} />
      </Stack.Navigator>
    </View>
  );
};
