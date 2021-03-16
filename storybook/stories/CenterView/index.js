import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StatusBar,
  StyleSheet,
  Platform,
  StatusBarIOS,
  SafeAreaView,
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';
import {Provider as ReduxQueryProvider} from 'redux-query-immutable-react';

import theme from 'theme';
import store from '../../../src/configureStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const getQueries = (state) => state.queries;

export default function CenterView({children, black}) {
  return (
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView mode="padding" style={styles.bottomSafeArea}>
              <StatusBar
                animated={true}
                backgroundColor="#000000"
                barStyle="light-content"
                // showHideTransition={statusBarTransition}
                hidden={false}
              />
              <StatusBar backgroundColor="#141416" />
              <View style={black ? styles.blackContent : styles.content}>
                {children}
              </View>
            </SafeAreaView>
          </SafeAreaProvider>
        </ThemeProvider>
      </ReduxQueryProvider>
    </Provider>
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
