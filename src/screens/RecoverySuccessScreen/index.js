import * as React from 'react';
import {useCallback} from 'react';
import styled from 'styled-components/native';
import RecoveryPasswordForm from 'components/forms/RecoveryPasswordForm';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from '../../hooks/api/useAuthApi';
import {CenterColumn, Column, PrimaryText} from 'components/styled';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import RecoverySuccessBlock from 'components/blocks/RecoverySuccessBlock';
import {Linking} from 'react-native';

const Container = styled(SafeAreaView)`
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  flex: 1;
  padding: 20px;
`;

const RecoverySuccessScreen = ({
  navigation,
  route: {
    params: {mailService},
  },
}) => {
  const goToSignIn = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

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
      <RecoverySuccessBlock
        goToSignIn={goToSignIn}
        openMailURL={openMailURL}
        mailService={mailService}
      />
    </Container>
  );
};

export default RecoverySuccessScreen;
