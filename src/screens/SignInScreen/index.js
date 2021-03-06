// @flow

import * as React from 'react';
import {useCallback} from 'react';
import styled from 'styled-components/native';
import AuthForm from 'components/forms/AuthForm';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from 'hooks/api/useAuthApi';
import {useToast} from 'react-native-styled-toast';
import errorCodes, {TWOFA_REQUIRED} from '@cashelec/shared/consts/errorCodes';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getErrorToastConfig} from '../../utils/toast';
import {Column} from 'components/styled';

const Wrapper: React.ComponentType<Column> = styled(Column)`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignInScreen = ({navigation}: {navigation: Object}) => {
  const {postLogin, postLoginIsFetching} = useAuthApi();
  const {toast} = useToast();

  const onRecoveryPassword = useCallback(() => {
    navigation.navigate('RecoveryPassword');
  }, []);

  const onSubmit = useCallback((formValues) => {
    postLogin({
      requestBody: formValues,
      successCallback: async ({data, errorCode}) => {
        if (errorCode === TWOFA_REQUIRED) {
          await EncryptedStorage.setItem('AUTH_EMAIL', formValues.email);
          await EncryptedStorage.setItem('AUTH_PASSWORD', formValues.password);
          navigation.navigate('SignIn2fa');
          //TODO redirect to 2fa screen
        } else {
          if (data && !errorCode) {
            const {
              twofa: {is2faActive},
              token,
            } = data;
            if (!is2faActive) {
              await EncryptedStorage.setItem('AUTH_TOKEN_BEFORE_2FA', token);
              navigation.navigate('Connect2fa');
            } else {
              toast(getErrorToastConfig({message: data}));
            }
          }
        }
      },
      errorCallback: ({errorCode}) =>
        toast({...getErrorToastConfig({message: errorCodes[errorCode]})}),
    });
  }, []);

  return (
    <Wrapper>
      <FormWrapper>
        <AuthForm
          onSubmit={onSubmit}
          onRecoveryPassword={onRecoveryPassword}
          isFetching={postLoginIsFetching}
        />
      </FormWrapper>
    </Wrapper>
  );
};

export default SignInScreen;
