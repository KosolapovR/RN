import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
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
import {Column} from 'components/styled';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledForm = styled(Column)`
  height: 180px;
`;
const StyledButtonsWrapper = styled.View`
  margin-top: 10px;
  justify-content: space-between;
  height: 100px;
`;

const AuthForm = ({handleSubmit, invalid, onResetPassword, onSubmit}) => (
  <Column>
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
    </StyledForm>

    <StyledButtonsWrapper>
      <BasicButton
        color="primary"
        title="Войти"
        onClick={handleSubmit(onSubmit)}
        isDisabled={invalid}
      />
      <BasicButton title="Восстановить пароль" onClick={onResetPassword} />
    </StyledButtonsWrapper>
  </Column>
);

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onResetPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'authForm',
})(AuthForm);
