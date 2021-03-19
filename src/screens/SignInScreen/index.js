import * as React from 'react';
import {useCallback, useContext} from 'react';
import styled from 'styled-components/native';
import AuthForm from 'components/forms/AuthForm';
import {AuthContext} from 'context/AuthContext';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from 'hooks/api/useAuthApi';
import {useToast} from 'react-native-styled-toast';
import errorCodes, {TWOFA_REQUIRED} from '@cashelec/shared/consts/errorCodes';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignInScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const {postLogin, postLoginIsFetching} = useAuthApi();
  const {toast} = useToast();

  const onRecoveryPassword = useCallback(() => {
    navigation.navigate('RecoveryPassword');
  }, []);

  const onSubmit = useCallback(
    (formValues) => {
      postLogin({
        requestBody: formValues,
        successCallback: async ({data, errorCode}) => {
          if (errorCode === TWOFA_REQUIRED) {
            await EncryptedStorage.setItem(
              'AUTH_EMAIL',
              formValues.get('email'),
            );
            await EncryptedStorage.setItem(
              'AUTH_PASSWORD',
              formValues.get('password'),
            );
            navigation.navigate('SignIn2fa');
            //TODO redirect to 2fa screen
          } else {
            if (data && !errorCode) {
              const {
                twofa: {is2faActive},
                token,
              } = data;
              if (!is2faActive) {
                navigation.navigate('Connect2fa', {token});
              } else {
                toast({
                  message: ' Ошибка',
                  subMessage: data,
                  intent: 'ERROR',
                });
              }
            }
          }
        },
        errorCallback: ({data}) =>
          toast({
            message: ' Ошибка',
            subMessage: data,
            intent: 'ERROR',
          }),
      });
    },

    [],
  );
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
