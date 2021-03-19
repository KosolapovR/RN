import * as React from 'react';
import styled from 'styled-components/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useToast} from 'react-native-styled-toast';

import Connection2faForm from 'components/forms/Connection2faForm';
import {AuthContext} from 'context/AuthContext';
import {useContext, useEffect} from 'react';
import {useAuthApi, useSettingsApi} from 'hooks/api';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connection2faScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);
  const {toast} = useToast();

  const {key2faShort, get2faKey, get2faKeyIsFinish} = useAuthApi();
  const {putConfirmService} = useSettingsApi();

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
    toast({
      message: `This is a toast. ${formData.get('passcode')} `,
    });

    // putConfirmService({
    //   requestBody: {
    //     passcode: formData.get('passcode'),
    //     type: 'app',
    //     connect2fa: true,
    //   },
    //   successCallback: () => {
    //     // toast.success(t('SUCCESS.2FA_ENABLED'));
    //     signIn(route.params.token);
    //   },
    // });
  };

  const onSkip = () => {
    signIn(route.params.token);
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
        initialValues={{
          key: key2faShort,
        }}
      />
    </Wrapper>
  );
};

export default Connection2faScreen;
