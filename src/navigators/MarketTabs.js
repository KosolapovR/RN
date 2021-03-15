import {useTheme} from 'styled-components';
import React from 'react';
import {Dimensions, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import MarketOffersScreen from '../screens/MarketOffersScreen';
import UserOffersScreen from '../screens/UserOffersScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';

const Tab = createMaterialTopTabNavigator();

export const MarketTabs = () => {
  const theme = useTheme();

  return (
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
  );
};
