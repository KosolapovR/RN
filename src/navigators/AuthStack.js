import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import InitialScreen from 'screens/InitialScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import RecoveryPasswordScreen from 'screens/RecoveryPasswordScreen';
import RecoverySuccessScreen from 'screens/RecoverySuccessScreen';
import Connect2faScreen from 'screens/Connect2faScreen';
import Select2faScreen from 'screens/Select2faScreen';
import Connection2faScreen from 'screens/Connection2faScreen';
import SignIn2faScreen from 'screens/SignIn2faScreen';

import LogoTitle from 'components/Logo';
import IconButton from 'components/buttons/IconButton';
import {SecondaryBoldTextLightLarge} from 'components/styled';
import HelpIcon from 'assets/img/help/help.svg';
import BackIcon from 'assets/img/arrows/arrow-back-white.svg';
import RegistrationSuccessScreen from 'screens/RegistrationSuccessScreen';
import RecoveryCodesScreen from 'screens/RecoveryCodesScreen';

const Stack = createStackNavigator();

const HeaderLeft = ({navigation}) => {
  return (
    <IconButton
      onClick={() => navigation.goBack()}
      icon={<BackIcon width={20} height={20} style={{marginLeft: 20}} />}
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
    icon={<HelpIcon width={40} style={{marginRight: 30}} />}
  />
);

const basicHeaderOptions = {
  headerStyle: {
    elevation: 0,
    shadowOffset: {height: 0, width: 0},
    backgroundColor: '#141416',
  },
  headerTitleStyle: {
    color: '#b6b6b6',
  },
  cardStyle: {backgroundColor: 'transparent'},
};
const headerWithLogo = {
  ...basicHeaderOptions,
  headerCenter: () => <HeaderCenter title="" />,
  headerLeft: () => <LogoTitle />,
  headerRight: () => <HeaderRight />,
  headerTitle: null,
};

const getHeaderWithHelpIconOptions = ({navigation, title}) => ({
  ...basicHeaderOptions,
  headerLeft: () => <HeaderLeft navigation={navigation} />,
  headerCenter: () => <HeaderCenter title={title} />,
  headerRight: () => <HeaderRight />,
  headerTitle: title,
});

const getHeader = ({navigation, title}) => ({
  ...basicHeaderOptions,
  headerLeft: () => <HeaderLeft navigation={navigation} />,
  headerCenter: () => <HeaderCenter title={title} />,
  headerRight: () => null,
  headerTitle: title,
});

export const AuthStack = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Stack.Navigator
        initialRouteName="Initial"
        screenOptions={{
          headerTitleContainerStyle: {
            borderBottomWidth: 0,
            shadowColor: 'transparent',
          },
        }}>
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={() => ({
            ...headerWithLogo,
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={() => ({
            headerTitleAlign: 'center',
            ...getHeaderWithHelpIconOptions({navigation, title: 'Вход'}),
          })}
        />
        <Stack.Screen
          name="Connect2fa"
          component={Connect2faScreen}
          options={() => ({
            ...headerWithLogo,
          })}
        />
        <Stack.Screen
          name="Select2fa"
          component={Select2faScreen}
          options={({route}) => ({
            ...getHeader({navigation, title: 'Подключить 2FA'}),
            headerLeft: null,
          })}
        />
        <Stack.Screen
          name="RecoveryCodes"
          component={RecoveryCodesScreen}
          options={({route}) => ({
            ...getHeader({navigation, title: 'Коды восстановления 2FA'}),
          })}
        />
        <Stack.Screen
          name="Connection2fa"
          component={Connection2faScreen}
          options={() => ({
            ...getHeader({navigation, title: 'Подключить 2FA'}),
          })}
        />
        <Stack.Screen
          name="SignIn2fa"
          component={SignIn2faScreen}
          options={() => ({
            headerTitleAlign: 'center',
            ...getHeaderWithHelpIconOptions({navigation, title: 'Вход'}),
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            ...getHeaderWithHelpIconOptions({navigation, title: 'Регистрация'}),
          }}
        />
        <Stack.Screen
          name="RegistrationSuccess"
          component={RegistrationSuccessScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="RecoveryPassword"
          component={RecoveryPasswordScreen}
          options={() => ({
            ...getHeaderWithHelpIconOptions({
              navigation,
              title: 'Восстановление',
            }),
          })}
        />
        <Stack.Screen
          name="RecoverySuccess"
          component={RecoverySuccessScreen}
          options={() => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </View>
  );
};
