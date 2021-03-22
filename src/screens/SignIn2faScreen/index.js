import * as React from 'react';
import {useContext} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from 'context/AuthContext';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from 'hooks/api/useAuthApi';
import {useToast} from 'react-native-styled-toast';
import Login2faForm from 'components/forms/Login2faForm';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getErrorToastConfig} from '../../utils/toast';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignIn2faScreen = ({route}) => {
  const {signIn} = useContext(AuthContext);

  const {postLogin2fa, postLogin2faIsFetching} = useAuthApi();
  const {toast} = useToast();

  const onSubmit = async ({passcode}) => {
    const email = await EncryptedStorage.getItem('AUTH_EMAIL');
    const password = await EncryptedStorage.getItem('AUTH_PASSWORD');

    postLogin2fa({
      requestBody: {
        email,
        password,
        passcode,
      },
      successCallback: ({data}) => {
        const {token} = data;
        signIn(token);
      },
      errorCallback: () => {
        toast({...getErrorToastConfig({message: 'Неверный пасскод'})});
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
