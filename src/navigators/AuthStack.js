import React from 'react';
import {View} from 'react-native';

import InitialScreen from 'screens/InitialScreen';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';
import RecoveryPasswordScreen from 'screens/RecoveryPasswordScreen';
import RecoverySuccessScreen from 'screens/RecoverySuccessScreen';
import Connect2faScreen from 'screens/Connect2faScreen';
import Select2faScreen from 'screens/Select2faScreen';

import LogoTitle from 'components/Logo';
import IconButton from 'components/buttons/IconButton';
import {SecondaryBoldTextLightLarge} from 'components/styled';
import HelpIcon from 'assets/img/help/help.svg';
import BackIcon from 'assets/img/arrows/arrow-back-white.svg';
import Connection2faScreen from 'screens/Connection2faScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();
// const Stack = createNativeStackNavigator();

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

const basicHeaderOptions = {
  headerStyle: {
    shadowOffset: {height: 0, width: 0},
    backgroundColor: '#141416',
  },
  headerTitleStyle: {
    color: '#b6b6b6',
  },
};
const headerWithLogo = {
  ...basicHeaderOptions,
  headerCenter: () => <HeaderCenter title="" />,
  headerLeft: () => <LogoTitle />,
  headerRight: () => <HeaderRight />,
};

const getHeaderWithHelpIconOptions = ({navigation, title}) => ({
  ...basicHeaderOptions,
  headerLeft: () => <HeaderLeft navigation={navigation} />,
  headerCenter: () => <HeaderCenter title={title} />,
  headerRight: () => <HeaderRight />,
});

const getHeader = ({navigation, title}) => ({
  ...basicHeaderOptions,
  headerLeft: () => <HeaderLeft navigation={navigation} />,
  headerCenter: () => <HeaderCenter title={title} />,
  headerRight: () => null,
});

export const AuthStack = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Stack.Navigator initialRouteName="Initial">
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
          options={({route}) => ({
            ...getHeaderWithHelpIconOptions({navigation, title: 'Вход'}),
          })}
        />
        <Stack.Screen
          name="Connect2fa"
          component={Connect2faScreen}
          options={({route}) => ({
            ...headerWithLogo,
          })}
        />
        <Stack.Screen
          name="Select2fa"
          component={Select2faScreen}
          options={({route}) => ({
            ...getHeader({navigation, title: 'Подключить 2FA'}),
          })}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const {SelectItem} = route.params;
            return SelectItem
              ? [
                  {
                    id: `item.${SelectItem.id}`,
                    animation: 'fade',
                  },
                ]
              : [];
          }}
        />
        <Stack.Screen
          name="Connection2fa"
          component={Connection2faScreen}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const {item} = route.params;
            return [
              {
                id: `item.${item.id}`,
                animation: 'fade',
              },
            ];
          }}
          options={({route}) => ({
            ...getHeader({navigation, title: 'Подключить 2FA'}),
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
          name="RecoveryPassword"
          component={RecoveryPasswordScreen}
          options={({route}) => ({
            ...getHeaderWithHelpIconOptions({
              navigation,
              title: 'Восстановление',
            }),
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
