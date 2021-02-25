import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';

import {
  minLength,
  required,
  maxLength,
  password,
  email,
} from 'shared/validators';

import BasicField from '../../fields/BasicField';
import BasicButton from '../../buttons/BasicButton';
import styled from 'styled-components/native';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const AuthForm = ({handleSubmit, invalid, onResetPassword}) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Field
          name="email"
          component={BasicField}
          props={{
            label: 'Ваша почта:',
          }}
          validate={[required, minLength6, email]}
          type="text"
        />
        <Field
          name="password"
          component={BasicField}
          props={{
            label: 'Пароль:',
            isSecurity: true,
          }}
          validate={[required, minLength6, maxLength30, password]}
          type="text"
        />
        <StyledButtonsWrapper>
          <BasicButton
            color="primary"
            title="Войти"
            onClick={() => {
              handleSubmit();
            }}
            isDisabled={invalid}
          />
          <BasicButton title="Восстановить пароль" onClick={onResetPassword} />
        </StyledButtonsWrapper>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onResetPassword: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'authForm',
})(AuthForm);
