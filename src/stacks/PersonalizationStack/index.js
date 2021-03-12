import React from 'react';
import {Dimensions, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SafetyScreen from '../../screens/SafetyScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';
import {ThemeProvider} from 'styled-components/native/dist/styled-components.native.esm';

const Tab = createMaterialTopTabNavigator();

function PersonalizationStack() {
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Tab.Navigator
        lazy={true}
        lazyPlaceholder={() => (
          <View style={{flex: 1, backgroundColor: '#141414'}} />
        )}
        initialLayout={{width: Dimensions.get('window').width}}>
        <Tab.Screen name="Safety" component={SafetyScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </View>
  );
}

export default PersonalizationStack;
