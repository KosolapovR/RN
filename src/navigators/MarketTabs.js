import {useTheme} from 'styled-components';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {Dimensions, View} from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import IconButton from 'components/buttons/IconButton';
import HelpIcon from 'assets/img/help/help.svg';

import {createStackNavigator} from '@react-navigation/stack';
import LogoTitle from 'components/Logo';
import {PersonalizationStack} from './PersonalizationStack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ActiveDealsScreen from '../screens/ActiveDealsScreen';
import CompletedDealsScreen from '../screens/CompletedDealsScreen';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';

const Tab = createMaterialTopTabNavigator();

export const DealsTabs = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
        <Tab.Navigator
          initialRouteName="ActiveDeals"
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
          <Tab.Screen name="ActiveDeals" component={ActiveDealsScreen} />
          <Tab.Screen name="CompletedDeals" component={CompletedDealsScreen} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
