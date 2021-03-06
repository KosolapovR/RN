import * as React from 'react';
import {PrimaryBoldLargeText} from 'components/styled';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';

const Container = styled(SafeAreaView)`
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SafetyScreen = () => {
  return (
    <Container>
      <PrimaryBoldLargeText>Safety!</PrimaryBoldLargeText>
    </Container>
  );
};

export default SafetyScreen;
