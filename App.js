import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {ThemeProvider} from 'styled-components/native';
import store from './src/configureStore';
import theme from './src/theme';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {AuthContext} from './src/context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import {MainTabs} from './src/navigators/MainTabs';
import {AuthStack} from './src/navigators/AuthStack';
import EncryptedStorage from 'react-native-encrypted-storage';

enableScreens();

const NativeStack = createNativeStackNavigator();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await EncryptedStorage.getItem('AUTH_TOKEN');

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          await EncryptedStorage.setItem('AUTH_TOKEN', data);
          dispatch({type: 'SIGN_IN', token: data});
        } catch (error) {}
      },
      signOut: async () => {
        await EncryptedStorage.removeItem('AUTH_TOKEN');
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async (data) => {
        try {
          await EncryptedStorage.setItem('AUTH_TOKEN', 'someToken');
          dispatch({type: 'SIGN_IN', token: 'someToken'});
        } catch (error) {}
      },
    }),
    [],
  );
  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <View style={{flex: 1, backgroundColor: '#141416'}}>
            <StatusBar
              translucent
              backgroundColor="#141416"
              barStyle="light-content"
            />
            <NavigationContainer>
              <NativeStack.Navigator screenOptions={{headerShown: false}}>
                {state.userToken ? (
                  <NativeStack.Screen name="Main" component={MainTabs} />
                ) : (
                  <NativeStack.Screen name="Auth" component={AuthStack} />
                )}
              </NativeStack.Navigator>
            </NavigationContainer>
          </View>
        </AuthContext.Provider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
