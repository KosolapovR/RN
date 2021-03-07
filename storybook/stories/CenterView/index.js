import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';
import {Provider as ReduxQueryProvider} from 'redux-query-immutable-react';

import theme from 'theme';
import store from '../../../src/configureStore';

export const getQueries = (state) => state.queries;

export default function CenterView({children, black}) {
  return (
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#141416" />
            <View style={black ? styles.blackContent : styles.content}>
              {children}
            </View>
          </SafeAreaView>
        </ThemeProvider>
      </ReduxQueryProvider>
    </Provider>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#141416',
    height: APPBAR_HEIGHT,
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
