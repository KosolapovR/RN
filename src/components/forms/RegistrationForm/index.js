import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
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
  agreeRequired,
} from 'shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import CheckBoxField from 'components/fields/CheckBoxField';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledForm = styled.ScrollView``;
const StyledButtonsWrapper = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  flex: 1;
`;

const RegistrationForm = ({handleSubmit, invalid}) => (
  <KeyboardAvoidingView
    behavior="padding"
    keyboardVerticalOffset={-150}
    style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <StyledForm>
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
        </StyledForm>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'registrationForm',
})(RegistrationForm);
