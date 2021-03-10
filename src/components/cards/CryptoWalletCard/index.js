import * as React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import IconButton from 'components/buttons/IconButton';
import {
  CardContainer,
  Column,
  PrimaryText,
  Row,
  RowSpaceBetween,
  SecondaryText,
  WhiteBoldText,
} from 'components/styled';
import SendIcon from 'assets/img/arrows/send-arrow-white.svg';
import ReceiveIcon from 'assets/img/arrows/receive-arrow-white.svg';
import LockIcon from 'assets/img/lock-white.svg';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const StyledIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 15px;
  border-radius: ${({theme}) => theme.main.borderRadius};
`;

const CryptoWalletCard = ({
  icon,
  walletName,
  balanceFree,
  balanceFrozen,
  onClickWallet,
  onClickSendMoney,
  onClickReceiveMoney,
  isDashboard,
}) => {
  const [showIcons, setShowIcons] = useState(true);
  const handleLongPress = () => {
    setShowIcons(false);

    textWidth.value = withTiming(100, {
      duration: 500,
      easing: Easing.cubic,
    });
    setTimeout(() => {
      textWidth.value = withTiming(
        20,
        {
          duration: 500,
          easing: Easing.ease,
        },
        (finished) => {
          if (finished) {
            runOnJS(setShowIcons)(true);
          }
        },
      );
    }, 3000);
  };

  const textWidth = useSharedValue(20);
  const textAnimatedStyles = useAnimatedStyle(() => {
    return {
      width: `${textWidth.value}%`,
    };
  });
  return (
    <CardContainer
      padding={15}
      marginRight={isDashboard ? 20 : 0}
      onPress={onClickWallet}
      style={isDashboard && {alignSelf: 'flex-start'}}>
      <RowSpaceBetween>
        <Row>
          <StyledIcon
            source={{
              uri: icon,
            }}
          />
          <Column>
            <WhiteBoldText>{walletName}</WhiteBoldText>
            <Row>
              <PrimaryText paddingRight={15}>{balanceFree}</PrimaryText>
              <LockIcon
                width={10}
                height={10}
                style={{opacity: 0.5, marginRight: 5, flex: 1}}
              />
              <Animated.View style={textAnimatedStyles}>
                <Pressable onLongPress={handleLongPress} style={{flex: 1}}>
                  <SecondaryText numberOfLines={1} style={{flex: 1}}>
                    {balanceFrozen}
                  </SecondaryText>
                </Pressable>
              </Animated.View>
            </Row>
          </Column>
        </Row>
        {!isDashboard && showIcons && (
          <Row style={{flex: 1}}>
            <IconButton
              onClick={onClickSendMoney}
              containerStyles={{marginRight: 10}}
              icon={<SendIcon width={17} height={17} style={{opacity: 0.6}} />}
            />
            <IconButton
              onClick={onClickReceiveMoney}
              icon={
                <ReceiveIcon width={17} height={17} style={{opacity: 0.6}} />
              }
            />
          </Row>
        )}
      </RowSpaceBetween>
    </CardContainer>
  );
};

CryptoWalletCard.propTypes = {
  icon: PropTypes.string.isRequired,
  walletName: PropTypes.string.isRequired,
  onClickSendMoney: PropTypes.func,
  onClickReceiveMoney: PropTypes.func,
  onClickWallet: PropTypes.func,
  isDashboard: PropTypes.bool,
  balanceFree: PropTypes.string,
  balanceFrozen: PropTypes.string,
};

CryptoWalletCard.defaultProps = {
  onClickSendMoney: () => {},
  onClickReceiveMoney: () => {},
  onClickWallet: () => {},
  isDashboard: false,
  balanceFree: '',
  balanceFrozen: '',
};

export default CryptoWalletCard;
