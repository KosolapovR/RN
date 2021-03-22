import * as React from 'react';
import styled from 'styled-components/native';
import {useToast} from 'react-native-styled-toast';

import errorCodes from '@cashelec/shared/consts/errorCodes';

import {useAuthApi} from 'hooks/api';
import {Column} from 'components/styled';
import FormWrapper from 'components/forms/FormWrapper';
import RegistrationForm from 'components/forms/RegistrationForm';
import {getWarningToastConfig} from '../../utils/toast';

const Container = styled(Column)`
  flex: 1;
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  padding: 20px;
`;

const SignUpScreen = ({navigation}) => {
  const {toast} = useToast();

  const {postSignUp} = useAuthApi();

  const onSubmit = (formValues) => {
    const userEmail = formValues.email;

    postSignUp({
      requestBody: {
        language: 'ru', //TODO add localization
        ...formValues,
      },
      successCallback: ({data: {token}}) => {
        navigation.navigate('RegistrationSuccess', {
          token,
          mailService: userEmail.split('@')[1],
        });
      },
      errorCallback: ({errorCode}) => {
        toast({...getWarningToastConfig({message: errorCodes[errorCode]})});
      },
    });
  };

  return (
    <Container>
      <FormWrapper verticalOffset={-150}>
        <RegistrationForm onSubmit={onSubmit} />
      </FormWrapper>
    </Container>
  );
};

export default SignUpScreen;
