import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const GeneralStatusBarColor = props => (
  <View style={styles.statusBar}>
    <StatusBar
      translucent
      backgroundColor={styles.statusBar.backgroundColor}
      {...props}
    />
  </View>
);
export default GeneralStatusBarColor;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: 'red',
  },
});
