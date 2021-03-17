import * as React from 'react';
import {useContext} from 'react';
import styled from 'styled-components/native';
import Connect2faForm from 'components/forms/Connect2faForm';
import {AuthContext} from 'context/AuthContext';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connect2faScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);
  const handleSubmitForm = (needSetup2FA) => {
    const {token} = route.params;

    if (needSetup2FA) {
      navigation.navigate('Connection2fa', {token});
    } else {
      signIn(token);
    }
  };
  return (
    <Wrapper>
      <Connect2faForm onSubmit={handleSubmitForm} />
    </Wrapper>
  );
};

export default Connect2faScreen;
