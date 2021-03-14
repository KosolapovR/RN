import React from 'react';
import {MainTabs} from './MainTabs';
import {AuthStack} from './AuthStack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

const NativeStack = createNativeStackNavigator();

function RootStack({userToken}) {
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{headerShown: false}}>
        {userToken ? (
          <NativeStack.Screen name="Main" component={MainTabs} />
        ) : (
          <NativeStack.Screen name="Auth" component={AuthStack} />
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
