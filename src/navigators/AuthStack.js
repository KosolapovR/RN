import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {useTheme} from 'styled-components';

import InitialScreen from '../screens/InitialScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LogoTitle from 'components/Logo';
import IconButton from 'components/buttons/IconButton';
import {SecondaryBoldTextLightLarge} from 'components/styled';
import HelpIcon from 'assets/img/help/help.svg';
import BackIcon from 'assets/img/arrows/arrow-back-white.svg';
import RecoveryPasswordScreen from '../screens/RecoveryPasswordScreen';
import RecoverySuccessScreen from '../screens/RecoverySuccessScreen';

const Stack = createNativeStackNavigator();

const HeaderLeft = ({navigation}) => {
  return (
    <IconButton
      onClick={() => navigation.goBack()}
      icon={
        <BackIcon
          width={20}
          height={20}
          style={{marginTop: 10, marginLeft: 10}}
        />
      }
      backgroundTransparent
    />
  );
};
const HeaderCenter = ({title}) => {
  return (
    <SecondaryBoldTextLightLarge paddingTop={10}>
      {title}
    </SecondaryBoldTextLightLarge>
  );
};

const HeaderRight = () => (
  <IconButton
    onClick={() => {}}
    backgroundTransparent
    icon={<HelpIcon width={40} />}
  />
);

export const AuthStack = ({navigation}) => {
  const theme = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={() => ({
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: theme.main.backgroundColors.primary,
            },
            headerCenter: () => <HeaderCenter title="" />,
            headerLeft: () => <LogoTitle />,
            headerRight: () => <HeaderRight />,
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={({route}) => ({
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: '#141416',
            },
            headerTitleStyle: {
              color: '#b6b6b6',
            },
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerCenter: () => <HeaderCenter title="Вход" />,
            headerRight: () => <HeaderRight />,
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: '#141416',
            },
            headerTitleStyle: {
              color: '#b6b6b6',
            },
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerCenter: () => <HeaderCenter title="Регистрация" />,
            headerRight: () => <HeaderRight />,
          }}
        />
        <Stack.Screen
          name="RecoveryPassword"
          component={RecoveryPasswordScreen}
          options={({route}) => ({
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: '#141416',
            },
            headerTitleStyle: {
              color: '#b6b6b6',
            },
            headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerCenter: () => <HeaderCenter title="Восстановление" />,
            headerRight: () => <HeaderRight />,
          })}
        />
        <Stack.Screen
          name="RecoverySuccess"
          component={RecoverySuccessScreen}
          options={({route}) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </View>
  );
};
