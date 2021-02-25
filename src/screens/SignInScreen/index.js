import * as React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import AuthForm from '../../components/forms/AuthForm';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 5%;
  flex: 1;
`;

const SignInScreen = () => {
  return (
    <Wrapper>
      <AuthForm />
    </Wrapper>
  );
};

export default SignInScreen;
