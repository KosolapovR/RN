import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import {Column} from 'components/styled';
import debounce from 'debounce-promise';
import endpoints from '@cashelec/shared/api/endpoints';

const StyledForm = styled(Column)`
  height: 180px;
`;
const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректый email')
    .min(6, 'Не менне 6 символов!')
    .max(30, 'Не более 30 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менне 6 символов')
    .max(30, 'Не более 30 символов')
    .required('Обязательное поле'),
});

const AuthForm = ({isFetching, onRecoveryPassword, onSubmit}) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {email: '', password: ''},
    onSubmit: (formValues) => onSubmit(formValues),
  });

  return (
    <Column>
      <StyledForm>
        <Column>
          <BasicField
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            value={values.email}
            label={'Ваша почта:'}
          />
          <BasicField
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors.password}
            touched={touched.password}
            value={values.password}
            label={'Пароль:'}
            isSecurity
          />

          <StyledButtonsWrapper>
            <BasicButton
              color="primary"
              title="Войти"
              onClick={handleSubmit}
              isDisabled={!isValid || !dirty}
              isLoading={isFetching}
            />
            <BasicButton
              title="Восстановить пароль"
              onClick={onRecoveryPassword}
            />
          </StyledButtonsWrapper>
        </Column>
      </StyledForm>
    </Column>
  );
};

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onRecoveryPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

AuthForm.defaultProps = {
  isFetching: false,
};

export default AuthForm;
