import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import InitialScreen from './src/screens/InitialScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

import Logo from './src/assets/img/logo/empo-logo-white.svg';
import HelpIcon from './src/assets/img/help/help.svg';
import styled, {ThemeProvider} from 'styled-components/native';
import store from './src/configureStore';
import theme from './src/theme';
import {Provider} from 'react-redux';

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

const Stack = createStackNavigator();

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

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <View style={{flex: 1}}>
          <StatusBar translucent barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Initial">
              <Stack.Screen
                name="Initial"
                component={InitialScreen}
                options={{
                  headerStyle: {
                    shadowOffset: {height: 0, width: 0},
                    backgroundColor: '#141416',
                  },
                  headerTitle: '',
                  headerLeft: () => <LogoTitle />,
                  headerRight: () => <HeaderRight />,
                }}
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
                  headerRight: () => <HeaderRight />,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
