import * as React from 'react';
import {useCallback, useContext} from 'react';
import styled from 'styled-components/native';
import AuthForm from '../../components/forms/AuthForm';
import {AuthContext} from '../../context/AuthContext';
import {postLogin} from 'api/auth/postLogin';
import {useDispatch} from 'react-redux';
import {mutateAsync, requestAsync} from 'redux-query-immutable/src/actions';
import useAuthApi from '../../hooks/api/useAuthApi';
import EncryptedStorage from 'react-native-encrypted-storage';
import FormWrapper from 'components/forms/FormWrapper';

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
      console.log('formValues', formValues);
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
