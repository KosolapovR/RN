import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {Provider} from 'react-redux';

import theme from '../../../src/theme';
import store from '../../../src/configureStore';

import style from './style';

export default function CenterView({children}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <View style={style.main}>{children}</View>
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
