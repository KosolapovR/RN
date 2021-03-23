import * as React from 'react';
import {useContext} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from 'context/AuthContext';
import Select2faForm from 'components/forms/Select2faForm';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Select2faScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const handleSubmitForm = async (id2FA) => {
    navigation.navigate('RecoveryCodes', {id2FA});
  };

  const onSkip = async () => {
    const token = await EncryptedStorage.getItem('AUTH_PASSWORD');
    signIn(token);
  };

  return (
    <Wrapper>
      <Select2faForm onSubmit={handleSubmitForm} onSkip={onSkip} />
    </Wrapper>
  );
};

export default Select2faScreen;
