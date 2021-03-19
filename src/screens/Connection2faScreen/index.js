import * as React from 'react';
import styled from 'styled-components/native';
import Connection2faForm from 'components/forms/Connection2faForm';
import {AuthContext} from 'context/AuthContext';
import {useContext, useEffect} from 'react';
import {useAuthApi} from 'hooks/api';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connection2faScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);

  const {key2faShort, get2faKey, get2faKeyIsFinish} = useAuthApi();

  useEffect(() => {
    const getKey = async () => {
      await EncryptedStorage.setItem(
        'AUTH_TOKEN_BEFORE_2FA',
        route.params.token,
      );
      get2faKey();
    };

    getKey();
  }, []);

  const handleSubmitForm = (v) => {
    console.log('submitting', v);
  };

  const onSkip = () => {
    signIn(route.params.token);
  };

  return (
    <Wrapper>
      <Connection2faForm
        route={route}
        navigation={navigation}
        onSubmit={handleSubmitForm}
        onSkip={onSkip}
        key2faShort={key2faShort}
        get2faKeyIsFinish={get2faKeyIsFinish}
        initialValues={{
          key: key2faShort,
        }}
      />
    </Wrapper>
  );
};

export default Connection2faScreen;
