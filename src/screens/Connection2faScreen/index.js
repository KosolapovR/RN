import React, {useContext, useEffect} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import styled from 'styled-components/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useToast} from 'react-native-styled-toast';

import Connection2faForm from 'components/forms/Connection2faForm';
import {AuthContext} from 'context/AuthContext';
import {useAuthApi, useSettingsApi} from 'hooks/api';
import errorCodes from '@cashelec/shared/consts/errorCodes';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connection2faScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);
  const {toast} = useToast();

  const {
    key2faShort,
    get2faKey,
    get2faKeyIsFinish,
    post2faEnable,
  } = useAuthApi();

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

  const onSubmit = (formData) => {
    post2faEnable({
      requestBody: {
        passcode: formData.get('passcode'),
        type: 'app',
      },
      errorCallback: ({errorCode}) => {
        toast({
          message: 'Ошибка',
          subMessage: errorCodes[errorCode],
          intent: 'ERROR',
        });
      },
      successCallback: () => {
        toast({
          message: 'Двухфакторная аутентификация успешно подключена',
          intent: 'SUCCESS',
        });
        signIn(route.params.token);
      },
    });
  };

  const onSkip = () => {
    signIn(route.params.token);
  };

  const onCopyKey = async () => {
    Clipboard.setString(key2faShort);
    toast({
      message: 'Успешно!',
      subMessage: 'Код успешно скопирован в буфер обмена',
      shouldVibrate: true,
    });
  };

  return (
    <Wrapper>
      <Connection2faForm
        route={route}
        navigation={navigation}
        onSubmit={onSubmit}
        onSkip={onSkip}
        key2faShort={key2faShort}
        get2faKeyIsFinish={get2faKeyIsFinish}
        onCopyKey={onCopyKey}
        initialValues={{
          key: key2faShort,
        }}
      />
    </Wrapper>
  );
};

export default Connection2faScreen;
