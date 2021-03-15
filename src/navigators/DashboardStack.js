import {useTheme} from 'styled-components';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {View} from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import IconButton from 'components/buttons/IconButton';
import HelpIcon from 'assets/img/help/help.svg';

import {createStackNavigator} from '@react-navigation/stack';
import LogoTitle from 'components/Logo';

const Stack = createStackNavigator();

export const DashboardStack = () => {
  const theme = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({route}) => ({
            headerRight: () => (
              <IconButton
                backgroundTransparent
                onClick={() => {}}
                icon={<HelpIcon width={40} />}
                containerStyles={{right: 20}}
              />
            ),
            headerTitle: '',
            headerLeft: () => <LogoTitle />,

            headerStyle: {
              backgroundColor: theme.main.backgroundColors.primary,
              shadowOffset: {height: 0, width: 0},
            },
          })}
        />
      </Stack.Navigator>
    </View>
  );
};
