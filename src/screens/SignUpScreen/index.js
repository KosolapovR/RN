import * as React from 'react';
import {Column} from 'components/styled';
import RegistrationForm from 'components/forms/RegistrationForm';
import styled from 'styled-components/native';
import FormWrapper from 'components/forms/FormWrapper';
import {useAuthApi} from 'hooks/api';
import {useToast} from 'react-native-styled-toast';
import errorCodes from '@cashelec/shared/consts/errorCodes';

const Container = styled(Column)`
  flex: 1;
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  padding: 20px;
`;
const SignUpScreen = () => {
  const {toast} = useToast();

  const {postSignUp} = useAuthApi();

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
        <RegistrationForm onSubmit={onSubmit} />
      </FormWrapper>
    </Container>
  );
};

export default SignUpScreen;
