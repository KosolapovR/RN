import * as React from 'react';
import {Column} from 'components/styled';
import RegistrationForm from 'components/forms/RegistrationForm';
import styled from 'styled-components/native';
import FormWrapper from 'components/forms/FormWrapper';
import {useAuthApi} from 'hooks/api';
import {useToast} from 'react-native-styled-toast';
import errorCodes from '@cashelec/shared/consts/errorCodes';
import debounce from 'debounce-promise';
import isEmpty from 'lodash/isEmpty';
import {
  email,
  username,
  required,
  minLength,
} from '@cashelec/shared/validators';
import {useDispatch} from 'react-redux';

const Container = styled(Column)`
  flex: 1;
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  padding: 20px;
`;

const minLength6 = minLength(6);

const SignUpScreen = () => {
  const {toast} = useToast();
  const dispatch = useDispatch();

  const {getCheckUsername, getCheckEmail, postSignUp} = useAuthApi();

  const usernameValidation = (value) =>
    required(value, null, {t: () => {}}) ||
    username(value, null, {t: () => {}});
  const emailValidation = (value) =>
    required(value, null, {t: () => {}}) || email(value, null, {t: () => {}});

  const asyncValidate = debounce(
    async (values, formDispatch, formProps, field) => {
      const asyncErrors = formProps.asyncErrors
        ? formProps.asyncErrors.toJS()
        : {};

      switch (field) {
        case 'username': {
          if (usernameValidation(values.get('username'))) {
            asyncErrors.username = usernameValidation(values.get('username'));
          } else {
            const {body} = await getCheckUsername({
              queryParams: {data: values.get('username')},
            });

            if (body.data) {
              asyncErrors.username = 'Такой никнейм уже существует';
            } else {
              delete asyncErrors.username;
            }
          }
          break;
        }
        case 'email': {
          if (emailValidation(values.get('email'))) {
            asyncErrors.email = emailValidation(values.get('email'));
          } else {
            const {body} = await getCheckEmail({
              queryParams: {data: encodeURIComponent(values.get('email'))},
            });
            console.log('body.data', body.data);
            if (body.data) {
              asyncErrors.email = 'Такой email уже существует';
            } else {
              delete asyncErrors.email;
            }
          }
          break;
        }
        case 'password': {
          if (minLength6(values.get('password'), null, {t: () => {}})) {
            throw {
              ...asyncErrors,
              password: 'Не менее 6 символов',
            };
          } else {
            delete asyncErrors.password;
          }

          if (
            values.get('repeatPassword') &&
            values.get('password') !== values.get('repeatPassword')
          ) {
            asyncErrors.repeatPassword = 'Пароли не совпадают';
          } else if (asyncErrors.repeatPassword === 'Пароли не совпадают') {
            delete asyncErrors.repeatPassword;
          }

          break;
        }
        case 'repeatPassword': {
          if (minLength6(values.get('repeatPassword'), null, {t: () => {}})) {
            asyncErrors.repeatPassword = 'Не менее 6 символов';
          } else if (
            values.get('password') &&
            values.get('password') !== values.get('repeatPassword')
          ) {
            asyncErrors.repeatPassword = 'Пароли не совпадают';
          } else {
            delete asyncErrors.repeatPassword;
          }
          break;
        }
        default:
          break;
      }

      if (!isEmpty(asyncErrors)) {
        throw asyncErrors;
      } else {
        return null;
      }
    },
    300,
  );

  const onSubmit = async (formValues) =>
    postSignUp({
      requestBody: {
        email: formValues.get('email'),
        username: formValues.get('username'),
        password: formValues.get('password'),
        repeatPassword: formValues.get('repeatPassword'),
        iAgree: formValues.get('iAgree'),
        language: 'ru', //TODO add localization
        captcha: formValues.get('captcha'),
      },
      successCallback: ({data: {token}}) => {
        console.log('success, token =', token);
      },
      errorCallback: ({errorCode, data}) => {
        toast({
          message: 'Ошибка',
          subMessage: errorCodes[errorCode],
          intent: 'ERROR',
        });
      },
    });

  return (
    <Container>
      <FormWrapper verticalOffset={-150}>
        <RegistrationForm onSubmit={onSubmit} asyncValidate={asyncValidate} />
      </FormWrapper>
    </Container>
  );
};

export default SignUpScreen;
