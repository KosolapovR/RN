import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

const FormWrapper = ({children, verticalOffset}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
    <KeyboardAvoidingView
      behavior="padding"
      style={{flex: 1}}
      keyboardVerticalOffset={verticalOffset}>
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

FormWrapper.propTypes = {
  verticalOffset: PropTypes.number,
  children: PropTypes.element,
};

FormWrapper.defaultProps = {
  verticalOffset: 0,
};

export default FormWrapper;
