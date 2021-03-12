import * as React from 'react';
import {PrimaryBoldLargeText, RowEnd} from 'components/styled';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';

const Container = styled(SafeAreaView)`
  padding: 20px;
  background-color: ${({theme}) => theme.main.backgroundColors.primary};
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const StyledBody = styled(RowEnd)`
  flex: 1;
  justify-content: center;
`;

const DashboardScreen = () => {
  return (
    <Container>
      <StyledBody>
        <PrimaryBoldLargeText>Dashboard</PrimaryBoldLargeText>
      </StyledBody>
    </Container>
  );
};

export default DashboardScreen;
