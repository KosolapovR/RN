import * as React from 'react';
import {useContext} from 'react';
import styled from 'styled-components/native';
import Connect2faForm from 'components/forms/Connect2faForm';
import {AuthContext} from 'context/AuthContext';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connect2faScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);
  const handleSubmitForm = async (needSetup2FA) => {
    if (needSetup2FA) {
      navigation.navigate('Select2fa');
    } else {
      const token = await EncryptedStorage.getItem('AUTH_PASSWORD');
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
