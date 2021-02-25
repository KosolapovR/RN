import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';

import {
  minLength,
  required,
  maxLength,
  password,
  email,
  agreeRequired,
} from 'shared/validators';

import BasicField from '../../fields/BasicField';
import BasicButton from '../../buttons/BasicButton';
import styled from 'styled-components/native';
import CheckBoxField from '../../fields/CheckBoxField';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledButtonsWrapper = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  height: 100px;
`;

const RegistrationForm = ({handleSubmit, invalid, onResetPassword}) => (
  <View>
    <Field
      name="email"
      component={BasicField}
      props={{
        label: 'Ваша почта:',
      }}
      validate={[required, minLength6, email]}
      type="text"
      maxLength={100}
    />
    <Field
      name="username"
      component={BasicField}
      validate={[required, minLength6]}
      props={{
        label: 'Никнейм:',
      }}
      type="text"
      maxLength={20}
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
    <Field
      name="repeatPassword"
      component={BasicField}
      props={{
        label: 'Повторите пароль:',
        isSecurity: true,
      }}
      validate={[required, minLength6, maxLength30, password]}
      type="text"
    />
    <Field
      name="iAgree"
      component={CheckBoxField}
      props={{
        label: 'Я принимаю условия Пользовательского соглашения',
        isSecurity: true,
      }}
      validate={agreeRequired}
    />

    <StyledButtonsWrapper>
      <BasicButton
        color="primary"
        title="Продолжить"
        onClick={() => {
          handleSubmit();
        }}
        isDisabled={invalid}
      />
    </StyledButtonsWrapper>
  </View>
);

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onResetPassword: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'registrationForm',
})(RegistrationForm);
