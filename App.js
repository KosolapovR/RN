import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import styled, {ThemeProvider} from 'styled-components/native';
import store from './src/configureStore';
import theme from './src/theme';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import AuthStack from './src/stacks/AuthStack';
import MainStack from './src/stacks/MainStack';
import InitialScreen from './src/screens/InitialScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import Logo from 'assets/img/logo/empo-logo-white.svg';
import HelpIcon from 'assets/img/help/help.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import {getToken, isSetToken} from './src/helpers/token';
import {useEffect, useState} from 'react';
import {AuthContext} from './src/context/AuthContext';
import RootStack from './src/navigators';

const Stack = createNativeStackNavigator();

enableScreens();

const TitleWrapper = styled.View`
  margin-left: 20px;
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const App = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    async function getCredentials() {
      const t = await getToken();
      setToken(t);
    }
    getCredentials();
  }, []);

  const removeTokenFromCtx = () => {
    setToken(null);
  };

  const setTokenToCtx = (t) => {
    setToken(t);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{token, removeTokenFromCtx, setTokenToCtx}}>
          <View style={{flex: 1, backgroundColor: '#141416'}}>
            <StatusBar
              translucent
              backgroundColor="#141416"
              barStyle="light-content"
            />
            <RootStack />
          </View>
        </AuthContext.Provider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
