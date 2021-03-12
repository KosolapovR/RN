import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {useTheme} from 'styled-components';

import SafetyScreen from '../screens/SafetyScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export const SettingsTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      lazy={true}
      lazyPlaceholder={() => (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.main.backgroundColors.primary,
          }}
        />
      )}
      initialLayout={{width: Dimensions.get('window').width}}>
      <Tab.Screen name="Safety" component={SafetyScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};
