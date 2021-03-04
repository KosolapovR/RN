import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';
import styled from 'styled-components/native';

import {minLength, required, password} from 'shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';

const minLength6 = minLength(6);
const maxLength30 = minLength(30);

const StyledForm = styled.View`
  flex: 1;
`;
const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const ResetPasswordForm = ({handleSubmit, invalid}) => (
  <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{backgroundColor: 'white'}}>
      <StyledForm>
        <Field
          name="password"
          component={BasicField}
          props={{
            label: 'Введите пароль:',
          }}
          validate={[required, minLength6, maxLength30, password]}
          type="text"
        />
        <Field
          name="repeatPassword"
          component={BasicField}
          props={{
            label: 'Повторите пароль:',
          }}
          validate={[required, minLength6, maxLength30, password]}
          type="text"
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
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
