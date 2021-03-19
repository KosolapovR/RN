import * as React from 'react';
import {useCallback, useContext} from 'react';
import styled from 'styled-components/native';
import AuthForm from 'components/forms/AuthForm';
import {AuthContext} from 'context/AuthContext';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from 'hooks/api/useAuthApi';
import {useToast} from 'react-native-styled-toast';

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
        errorCallback: ({data}) =>
          toast({
            message: ' Ошибка',
            subMessage: data,
            intent: 'ERROR',
          }),
      }).then(({body}) => {
        if (body && !body.error) {
          const {is2faActive} = body.data.twofa;
          const {token} = body.data;
          if (!is2faActive) {
            navigation.navigate('Connect2fa', {token});
          } else {
            //TODO redirect to 2fa screen
            signIn(token);
          }
        }
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
