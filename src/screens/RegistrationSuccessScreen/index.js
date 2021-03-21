import * as React from 'react';
import {useCallback} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import RegistrationSuccessBlock from 'components/blocks/RegistrationSuccessBlock';
import {Linking} from 'react-native';

const Container = styled(SafeAreaView)`
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  flex: 1;
  padding: 20px;
`;

const RegistrationSuccessScreen = ({
  navigation,
  route: {
    params: {mailService, token},
  },
}) => {
  const onSignIn = useCallback(() => {
    navigation.navigate('Connect2fa', {token});
  }, [token]);

  const openMailURL = useCallback(() => {
    Linking.canOpenURL(`https://${mailService}`).then((supported) => {
      if (supported) {
        Linking.openURL(`https://${mailService}`);
      } else {
        Linking.openURL('https://google.com');
      }
    });
  }, [mailService]);

  return (
    <Container>
      <RegistrationSuccessBlock
        onSignIn={onSignIn}
        openMailURL={openMailURL}
        mailService={mailService}
      />
    </Container>
  );
};

export default RegistrationSuccessScreen;
