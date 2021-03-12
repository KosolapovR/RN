import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import InitialScreen from '../../screens/InitialScreen';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import styled, {
  ThemeProvider,
} from 'styled-components/native/dist/styled-components.native.esm';
import Logo from 'assets/img/logo/empo-logo-white.svg';
import HelpIcon from 'assets/img/help/help.svg';
import {useTheme} from 'styled-components';
import BackIcon from 'assets/img/arrows/arrow-back-white.svg';

const Stack = createNativeStackNavigator();

const TitleWrapper = styled.View`
  margin-left: 20px;
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const HeaderRightWrapper = styled.View`
  width: 100%;
  height: 100%;
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

function AuthStack({navigation}) {
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
}

export default AuthStack;
