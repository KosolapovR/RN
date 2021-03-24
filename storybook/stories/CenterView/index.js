import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {ThemeProvider} from 'styled-components/native';

import theme from 'theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

export const getQueries = (state) => state.queries;

export default function CenterView({children, black}) {
  useEffect(() => {
    async function init() {
      await RNBootSplash.hide({fade: true});
    }

    init();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView mode="padding" style={styles.bottomSafeArea}>
          <StatusBar
            animated={true}
            backgroundColor="#000000"
            barStyle="light-content"
            hidden={false}
          />
          <StatusBar backgroundColor="#141416" />
          <View style={black ? styles.blackContent : styles.content}>
            {children}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: '#1b1b1b',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#141416',
  },
  blackContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
});

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};
