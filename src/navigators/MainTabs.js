import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {useTheme} from 'styled-components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {PersonalizationStack} from './PersonalizationStack';
import {DashboardStack} from './DashboardStack';
import {DealsTabs} from './DealsTabs';
import {MarketTabs} from './MarketTabs';
import {WalletsTabs} from './WalletsTabs';
import CustomBottomTabBar from 'components/CustomBottomTabBar';

import WalletIcon from 'assets/img/wallet-icon.svg';
import ExchangeIcon from 'assets/img/menu/marketMobileActiveIcon.svg';
import DashboardIcon from 'assets/img/menu/dashboardMobileActiveIcon.svg';
import DealsIcon from 'assets/img/menu/dealsMobileActiveIcon.svg';
import ProfileIcon from 'assets/img/menu/profileMobileActiveIcon.svg';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  const theme = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        tabBar={(props) => <CustomBottomTabBar {...props} />}>
        <Tab.Screen
          name="Wallets"
          component={WalletsTabs}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({isFocused}) => (
              <WalletIcon
                height={26}
                width={26}
                style={{opacity: isFocused ? 1 : 0.5}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketTabs}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({isFocused}) => (
              <ExchangeIcon
                height={26}
                width={26}
                style={{opacity: isFocused ? 1 : 0.5}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({isFocused}) => (
              <DashboardIcon
                height={26}
                width={26}
                style={{opacity: isFocused ? 1 : 0.5}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Deals"
          component={DealsTabs}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({isFocused}) => (
              <DealsIcon
                height={26}
                width={26}
                style={{opacity: isFocused ? 1 : 0.5}}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={PersonalizationStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({isFocused}) => (
              <ProfileIcon
                height={26}
                width={26}
                style={{opacity: isFocused ? 1 : 0.5}}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141416',
    paddingTop: 12,
  },
});
