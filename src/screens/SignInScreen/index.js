import * as React from 'react';
import {useCallback, useContext} from 'react';
import styled from 'styled-components/native';
import AuthForm from 'components/forms/AuthForm';
import {AuthContext} from 'context/AuthContext';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from 'hooks/api/useAuthApi';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignInScreen = ({navigation}) => {
  const onRecoveryPassword = useCallback(() => {
    navigation.navigate('RecoveryPassword');
  }, []);
  const {signIn} = useContext(AuthContext);
  const {postLogin, postLoginIsFetching} = useAuthApi();
  const onSubmit = useCallback(
    (formValues) => {
      postLogin({
        requestBody: formValues,
      }).then(({body}) => {
        if (body && !body.error) {
          signIn(body.data.token);
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
