import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';

import BasicButton from '../../buttons/BasicButton';
import styled from 'styled-components/native';
import CodeField from '../../fields/CodeField';

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const Login2faForm = ({handleSubmit, invalid, onEnterWithRecoveryCodes}) => {
  return (
    <View>
      <CodeField
        onFinishCheckingCode={() => {}}
        label="Введите код из своего 2FA приложения:"
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
        <BasicButton
          color="secondary"
          title="Войти с помощью кодов восстановления"
          onClick={onEnterWithRecoveryCodes}
          isDisabled={invalid}
        />
      </StyledButtonsWrapper>
    </View>
  );
};

Login2faForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onEnterWithRecoveryCodes: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login2faForm',
})(Login2faForm);
