import React from 'react';
import PropTypes from 'prop-types';
import {View, SafeAreaView} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';

import theme from '../../../src/theme';
import store from '../../../src/configureStore';

import style from './style';

export default function CenterView({children}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={style.main}>
          <View style={style.main}>{children}</View>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};
