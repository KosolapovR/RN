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

const Select2faScreen = ({
  navigation,
  route: {
    params: {token},
  },
}) => {
  const {signIn} = useContext(AuthContext);

  const handleSubmitForm = async (id2FA) => {
    //записываем временный токен в хранилище т.к запрос recoveryCodes требуюет токен
    await EncryptedStorage.setItem('AUTH_TOKEN_BEFORE_2FA', token);

    navigation.navigate('RecoveryCodes', {id2FA, token});
  };

  const onSkip = () => {
    signIn(token);
  };

  return (
    <Wrapper>
      <Select2faForm onSubmit={handleSubmitForm} onSkip={onSkip} />
    </Wrapper>
  );
};

export default Select2faScreen;
