import * as React from 'react';
import {View, Text} from 'react-native';
import {Column} from 'components/styled';
import RegistrationForm from 'components/forms/RegistrationForm';
import styled from 'styled-components/native';

const Container = styled(Column)`
  flex: 1;
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  padding: 20px;
`;
const SignUpScreen = () => {
  return (
    <Container>
      <RegistrationForm />
    </Container>
  );
};

export default SignUpScreen;
