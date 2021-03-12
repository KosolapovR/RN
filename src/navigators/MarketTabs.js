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
import MarketOffersScreen from '../screens/MarketOffersScreen';
import UserOffersScreen from '../screens/UserOffersScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';

const Tab = createMaterialTopTabNavigator();

export const MarketTabs = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
        <Tab.Navigator
          initialRouteName="MarketOffers"
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
          <Tab.Screen name="Market Offers" component={MarketOffersScreen} />
          <Tab.Screen name="User Offers" component={UserOffersScreen} />
          <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};
