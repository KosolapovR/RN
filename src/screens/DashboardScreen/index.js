import * as React from 'react';
import {Button} from 'react-native';
import {Column, PrimaryBoldLargeText, RowEnd} from 'components/styled';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView.native';
import HelpIcon from 'assets/img/help/help.svg';
import IconButton from 'components/buttons/IconButton';
import {getToken, removeToken} from '../../helpers/token';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext';
import {useTheme} from 'styled-components';
import Logo from 'assets/img/logo/empo-logo-white.svg';

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
const HeaderRight = ({onClick, rightOffset}) => {
  return (
    <IconButton
      backgroundTransparent
      onClick={onClick}
      icon={<HelpIcon width={40} />}
      containerStyles={{right: rightOffset || 0}}
    />
  );
};

const TitleWrapper = styled.View`
  flex: 1;
`;

const LogoTitle = () => {
  return (
    <TitleWrapper>
      <Logo width={140} />
    </TitleWrapper>
  );
};

const DashboardScreen = ({navigation}) => {
  const [count, setCount] = React.useState(0);

  const {removeTokenFromCtx} = useContext(AuthContext);
  const theme = useTheme();
  const logOut = async () => {
    console.log('123');
    await removeToken();
    removeTokenFromCtx();
  };
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     safeAreaInsets: {top: 50},
  //     headerRight: () => <HeaderRight onClick={logOut} rightOffset={35} />,
  //     headerTitle: '',
  //
  //     headerStyle: {
  //       backgroundColor: theme.main.backgroundColors.primary,
  //     },
  //   });
  // }, [navigation]);
  return (
    <Container>
      <StyledBody>
        <PrimaryBoldLargeText>Dashboard</PrimaryBoldLargeText>
      </StyledBody>
    </Container>
  );
};

export default DashboardScreen;
