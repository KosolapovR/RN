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
import {Column} from 'components/styled';

const minLength6 = minLength(6);
const maxLength30 = minLength(30);

const StyledForm = styled.View`
  height: 185px;
`;
const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 0;
  margin-top: 10px;
`;

const ResetPasswordForm = ({handleSubmit, invalid}) => (
  <Column>
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
  </Column>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
