import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';
import styled from 'styled-components/native';

import {
  minLength,
  required,
  maxLength,
  password,
  email,
} from 'shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledForm = styled.View`
  flex: 1;
`;
const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const AuthForm = ({handleSubmit, invalid, onResetPassword}) => (
  <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{backgroundColor: 'white'}}>
      <StyledForm>
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
      </StyledForm>
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
