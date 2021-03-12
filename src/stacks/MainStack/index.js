import React from 'react';
import {View, Dimensions} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import styled, {
  ThemeProvider,
} from 'styled-components/native/dist/styled-components.native.esm';
import Logo from 'assets/img/logo/empo-logo-white.svg';
import HelpIcon from 'assets/img/help/help.svg';
import DashboardScreen from '../../screens/DashboardScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SettingsStack from '../SettingsStack';
import StoriesScreen from '../PersonalizationStack';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TitleWrapper = styled.View`
  margin-left: 20px;
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const HeaderRightWrapper = styled.View`
  margin-right: 20px;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const LogoTitle = () => {
  return (
    <TitleWrapper>
      <Logo width={140} />
    </TitleWrapper>
  );
};

const HeaderRight = () => {
  return (
    <HeaderRightWrapper>
      <HelpIcon width={40} />
    </HeaderRightWrapper>
  );
};

const TabScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Tab.Navigator
        tabBarPosition="bottom"
        lazy={true}
        lazyPlaceholder={() => (
          <View style={{flex: 1, backgroundColor: '#1b1b1b'}} />
        )}
        initialLayout={{width: Dimensions.get('window').width}}>
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </View>
  );
};

function MainStack({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={TabScreen} />
      </Stack.Navigator>
    </View>
  );
}

export default MainStack;
