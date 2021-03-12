import * as React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import AuthForm from '../../components/forms/AuthForm';
import {setToken} from '../../helpers/token';
import {useDispatch} from 'react-redux';
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignInScreen = () => {
  const {setTokenToCtx} = useContext(AuthContext);

  const onSubmit = () => {
    setToken('someToken').then((token) => {
      setTokenToCtx(token);
    });
  };
  return (
    <Wrapper>
      <AuthForm handleSubmit={onSubmit} />
    </Wrapper>
  );
};

export default SignInScreen;
