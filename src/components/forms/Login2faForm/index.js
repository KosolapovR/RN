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
import {useFormik} from 'formik';
import * as Yup from 'yup';

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const Login2faSchema = Yup.object().shape({
  passcode: Yup.string().required('Обязательное поле'),
});

const Login2faForm = ({onSubmit, isFetching}) => {
  const {handleSubmit, setFieldValue, isValid, dirty} = useFormik({
    validationSchema: Login2faSchema,
    initialValues: {email: '', password: ''},
    onSubmit: (formValues) => onSubmit(formValues),
  });

  const onFinishCheckingCode = (passcode) => {
    setFieldValue('passcode', passcode);
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
              onClick={handleSubmit}
              isDisabled={!isValid || !dirty}
              isLoading={isFetching}
            />
          </StyledButtonsWrapper>
        </StyledForm>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

Login2faForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

Login2faForm.defaultProps = {
  postLogin2faIsFetching: false,
};

export default Login2faForm;
