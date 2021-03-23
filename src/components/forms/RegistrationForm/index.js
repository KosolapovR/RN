// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native';
import debounce from 'debounce-promise';

import endpoints from '@cashelec/shared/api/endpoints';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import CheckBoxField from 'components/fields/CheckBoxField';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const StyledForm = styled.ScrollView``;

const StyledButtonsWrapper = styled.View`
  margin-top: 20px;
  justify-content: space-between;
  flex: 1;
`;

const regExp = '^[a-zA-Z0-9$@$!%*?&#^-_. +]+$';

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректый email')
    .min(6, 'Не менне 6 символов!')
    .max(30, 'Не более 30 символов')
    .test(
      'checkEmailDuplication',
      'Такой email уже существует',
      debounce(async function (userEmail) {
        const response = await fetch(
          endpoints.getCheckEmailUrl({data: encodeURIComponent(userEmail)}),
        );

        const body = await response.json();

        return !body.data;
      }, 350),
    )
    .required('Обязательное поле'),
  username: Yup.string()
    .min(6, 'Не менне 6 символов!')
    .max(30, 'Не более 30 символов')
    .matches(regExp, 'Доступны только английские символы')
    .test(
      'checkEmailDuplication',
      'Такой никнейм уже существует',
      debounce(async function (userName) {
        const response = await fetch(
          endpoints.getCheckUsernameUrl({data: encodeURIComponent(userName)}),
        );

        const body = await response.json();

        return !body.data;
      }, 350),
    )
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менне 6 символов')
    .max(30, 'Не более 30 символов')
    .required('Обязательное поле'),
  repeatPassword: Yup.string().when('password', {
    is: (val) => val && val.length > 0,
    then: Yup.string().oneOf([Yup.ref('password')], 'Пароли не совпадают'),
  }),
  agreeTerms: Yup.bool().oneOf([true]),
});

const RegistrationForm = ({onSubmit}: {onSubmit: Function}) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    validationSchema: RegistrationSchema,
    initialValues: {
      email: '',
      username: '',
      password: '',
      repeatPassword: '',
      agreeTerms: true,
    },
    onSubmit: (formValues) => {
      onSubmit(formValues);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-150}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <StyledForm>
            <BasicField
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              value={values.email}
              label={'Ваша почта:'}
            />
            <BasicField
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={errors.username}
              touched={touched.username}
              value={values.username}
              label={'Никнейм:'}
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
            <BasicField
              onChangeText={handleChange('repeatPassword')}
              onBlur={handleBlur('repeatPassword')}
              error={errors.repeatPassword}
              touched={touched.repeatPassword}
              value={values.repeatPassword}
              label={'Повторите пароль:'}
              isSecurity
            />
            <CheckBoxField
              label="Я принимаю условия Пользовательского соглашения"
              error={errors.agreeTerms}
              touched={touched.agreeTerms}
              value={values.agreeTerms}
              onChange={(v) => setFieldValue('agreeTerms', v)}
            />
            <StyledButtonsWrapper>
              <BasicButton
                color="primary"
                title="Продолжить"
                onClick={handleSubmit}
                isDisabled={!isValid || !dirty}
              />
            </StyledButtonsWrapper>
          </StyledForm>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
