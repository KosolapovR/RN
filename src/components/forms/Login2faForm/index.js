import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native';
import {change, reduxForm} from 'redux-form/immutable';

import BasicButton from 'components/buttons/BasicButton';
import CodeField from 'components/fields/CodeField';
import {useDispatch} from 'react-redux';

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const Login2faForm = ({handleSubmit, invalid, onSubmit, isFetching}) => {
  const dispatch = useDispatch();

  const onFinishCheckingCode = (passcode) => {
    dispatch(change('login2faForm', 'passcode', passcode));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledForm>
          <CodeField
            onFinishCheckingCode={onFinishCheckingCode}
            label="Введите код из своего 2FA приложения:"
          />
          <StyledButtonsWrapper>
            <BasicButton
              color="primary"
              title="Продолжить"
              onClick={handleSubmit(onSubmit)}
              isDisabled={invalid}
              isLoading={isFetching}
            />
            {/*<BasicButton*/}
            {/*  color="secondary"*/}
            {/*  title="Войти с помощью кодов восстановления"*/}
            {/*  onClick={onEnterWithRecoveryCodes}*/}
            {/*  isDisabled={invalid}*/}
            {/*/>*/}
          </StyledButtonsWrapper>
        </StyledForm>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

Login2faForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
};

Login2faForm.defaultProps = {
  postLogin2faIsFetching: false,
};

export default reduxForm({
  form: 'login2faForm',
})(Login2faForm);
