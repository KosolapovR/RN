import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import InitialScreen from '../screens/InitialScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import styled from 'styled-components/native/dist/styled-components.native.esm';
import HelpIcon from 'assets/img/help/help.svg';
import {useTheme} from 'styled-components';
import BackIcon from 'assets/img/arrows/arrow-back-white.svg';
import LogoTitle from 'components/Logo';

const Stack = createNativeStackNavigator();

const HeaderRightWrapper = styled.View`
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
`;

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

const HeaderRight = () => {
  return (
    <HeaderRightWrapper>
      <HelpIcon width={40} />
    </HeaderRightWrapper>
  );
};

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
            headerTitle: '',
            headerLeft: () => <LogoTitle />,
            headerRight: () => <HeaderRight />,
          })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerStyle: {
              shadowOffset: {height: 0, width: 0},
              backgroundColor: '#141416',
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
              backgroundColor: '#141416',
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
};
