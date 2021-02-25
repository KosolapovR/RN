import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import {reduxForm} from 'redux-form/immutable';

const WithReduxForm = ({children}) => {
  return <View>{children}</View>;
};

WithReduxForm.defaultProps = {
  children: null,
};

WithReduxForm.propTypes = {
  children: PropTypes.node,
};

export default reduxForm({
  form: 'storyBookForm',
})(WithReduxForm);
