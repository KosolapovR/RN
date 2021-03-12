import React, {useContext} from 'react';
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
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import MainStack from '../MainStack';
import AuthStack from '../../navigators/AuthStack';

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

const homeScreens = {
  Main: MainStack,
};

const authScreens = {
  Auth: AuthStack,
};

function RootStack({navigation}) {
  const {token} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {Object.entries({
          ...(token ? homeScreens : authScreens),
        }).map(([name, component]) => (
          <Stack.Screen name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
