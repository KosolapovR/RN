import React, {useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {useTheme} from 'styled-components';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import InitialScreen from '../screens/InitialScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import Logo from 'assets/img/logo/empo-logo-white.svg';
import BackIcon from 'assets/img/arrows/arrow-back-white.svg';
import HelpIcon from 'assets/img/help/help.svg';
import DashboardScreen from '../screens/DashboardScreen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import SafetyScreen from '../screens/SafetyScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import IconButton from 'components/buttons/IconButton';
import {removeToken} from '../helpers/token';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import {PrimaryBoldLargeText} from 'components/styled';
import {createStackNavigator} from '@react-navigation/stack';
const NativeStack = createNativeStackNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TitleWrapper = styled.View`
  flex: 1;
`;

const LogoTitle = () => {
  return (
    <TitleWrapper>
      <Logo width={140} />
    </TitleWrapper>
  );
};

const HeaderLeft = ({navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <BackIcon
        width={20}
        height={20}
        style={{marginTop: 10, marginLeft: 10}}
      />
    </TouchableOpacity>
  );
};

const HeaderRight = ({onClick, rightOffset}) => {
  return (
    <IconButton
      backgroundTransparent
      onClick={onClick}
      icon={<HelpIcon width={40} />}
      containerStyles={{right: rightOffset || 0}}
    />
  );
};

function PersonalizationTabs({...props}) {
  const theme = useTheme();
  console.log('render personalization');

  useEffect(() => {}, [props.navigation]);
  return (
    <Tab.Navigator
      // lazy={true}
      // lazyPlaceholder={() => (
      /*<View style={{flex: 1, backgroundColor: '#141414'}} />*/
      // )}
      initialLayout={{width: Dimensions.get('window').width}}>
      <Tab.Screen name="Safety" component={SafetyScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

function DashboardStack({navigation}) {
  const theme = useTheme();
  const {removeTokenFromCtx} = useContext(AuthContext);
  const logOut = async () => {
    console.log('logouts');
    await removeToken();
    removeTokenFromCtx();
  };
  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({route}) => ({
            headerRight: () => (
              <HeaderRight
                onClick={() => {
                  logOut();
                }}
              />
            ),
            headerTitle: '',
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: theme.main.backgroundColors.primary,
            },
          })}
        />
      </Stack.Navigator>
    </View>
  );
}

function SettingsStack({navigation, params}) {
  const theme = useTheme();
  console.log('render SettingsStack');

  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Stack.Navigator initialRouteName={'Profile'}>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({route}) => ({
            headerRight: () => (
              <HeaderRight
                onClick={() => {
                  navigation.navigate('Personalization');
                }}
              />
            ),
            headerTitle: '',
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: theme.main.backgroundColors.primary,
            },
          })}
        />
        <Stack.Screen name="Personalization" component={PersonalizationTabs} />
      </Stack.Navigator>
    </View>
  );
}

function AuthStack({navigation}) {
  const theme = useTheme();
  const {removeTokenFromCtx} = useContext(AuthContext);
  const logOut = async () => {
    console.log('123');
    await removeToken();
    removeTokenFromCtx();
  };
  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={({route}) => ({
            headerRight: () => (
              <HeaderRight rightOffset={10} onClick={() => {}} />
            ),
            headerTitle: '',
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: theme.main.backgroundColors.primary,
            },
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: theme.main.backgroundColors.primary,
            },
            headerTitleStyle: {
              color: '#b6b6b6',
            },
            headerTitle: 'Вход',
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: theme.main.backgroundColors.primary,
            },
            headerTitleStyle: {
              color: '#b6b6b6',
            },
            headerTitle: 'Регистрация',
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerRight: () => <HeaderRight />,
          }}
        />
      </Stack.Navigator>
    </View>
  );
}
const MaterialTab = createMaterialBottomTabNavigator();
function MainTabs() {
  const theme = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: theme.main.backgroundColors.primary}}>
      <Tab.Navigator
        tabBarPosition="bottom"
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
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </View>
  );
}

function RootStack() {
  const {token} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{headerShown: false}}>
        {token ? (
          <NativeStack.Screen name="Main" component={MainTabs} />
        ) : (
          <NativeStack.Screen name="Auth" component={AuthStack} />
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
