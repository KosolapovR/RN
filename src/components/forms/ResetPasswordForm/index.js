import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';

import {minLength, required, maxLength, password} from 'shared/validators';

import BasicField from '../../fields/BasicField';
import BasicButton from '../../buttons/BasicButton';
import styled from 'styled-components/native';
import AttentionBlock from '../../blocks/AttentionBlock';

const minLength6 = minLength(6);
const maxLength30 = minLength(30);

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const ResetPasswordForm = ({handleSubmit, invalid}) => (
  <View>
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
  </View>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'resetPasswordForm',
})(ResetPasswordForm);
