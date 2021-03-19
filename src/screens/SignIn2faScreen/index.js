import * as React from 'react';
import {useCallback, useContext} from 'react';
import styled from 'styled-components/native';
import AuthForm from 'components/forms/AuthForm';
import {AuthContext} from 'context/AuthContext';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from 'hooks/api/useAuthApi';
import {useToast} from 'react-native-styled-toast';
import errorCodes, {TWOFA_REQUIRED} from '@cashelec/shared/consts/errorCodes';
import Login2faForm from 'components/forms/Login2faForm';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignIn2faScreen = ({route}) => {
  const {signIn} = useContext(AuthContext);

  const {postLogin2fa, postLogin2faIsFetching} = useAuthApi();
  const {toast} = useToast();

  const onSubmit = async (formValues) => {
    const email = await EncryptedStorage.getItem('AUTH_EMAIL');
    const password = await EncryptedStorage.getItem('AUTH_PASSWORD');

    postLogin2fa({
      requestBody: {
        email,
        password,
        ...formValues.toJS(),
      },
      successCallback: ({data}) => {
        const {token} = data;
        signIn(token);
      },
      errorCallback: () => {
        toast({
          message: 'Ошибка!',
          subMessage: 'Неверный пасскод',
          intent: 'ERROR',
        });
      },
    });
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Login2faForm onSubmit={onSubmit} isFetching={postLogin2faIsFetching} />
      </FormWrapper>
    </Wrapper>
  );
};

export default SignIn2faScreen;
