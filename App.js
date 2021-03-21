import * as React from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import {ThemeProvider} from 'styled-components/native';
import {ToastProvider} from 'react-native-styled-toast';
import EncryptedStorage from 'react-native-encrypted-storage';
import {enableScreens} from 'react-native-screens';

import store from './src/configureStore';
import theme from './src/theme';
import {AuthContext} from 'context/AuthContext';
import SplashScreen from './src/screens/SplashScreen';
import RootStack from './src/navigators/RootStack';

enableScreens();

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

    bootstrapAsync().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
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
    return <View style={{flex: 1, backgroundColor: '#141416'}} />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AuthContext.Provider value={authContext}>
            <View style={{flex: 1, backgroundColor: '#141416'}}>
              <StatusBar
                translucent
                backgroundColor="#141416"
                barStyle="light-content"
              />
              <RootStack userToken={state.userToken} />
            </View>
          </AuthContext.Provider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
