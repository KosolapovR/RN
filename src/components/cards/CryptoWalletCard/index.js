import * as React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from 'styled-components/native';

import IconButton from 'components/buttons/IconButton';
import {
  CardContainer,
  PrimaryText,
  Row,
  RowSpaceBetween,
  WhiteBoldText,
} from 'components/styled';
import SendIcon from 'assets/img/arrows/send-arrow-white.svg';
import ReceiveIcon from 'assets/img/arrows/receive-arrow-white.svg';

const StyledIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const CryptoWalletCard = ({
  icon,
  walletName,
  additionalInfo,
  onClickWallet,
  onClickSendMoney,
  onClickReceiveMoney,
  isDashboard,
}) => {
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
            style={{borderRadius: 5}}
          />
          <View>
            <WhiteBoldText>{walletName}</WhiteBoldText>
            <PrimaryText>{additionalInfo}</PrimaryText>
          </View>
        </Row>
        {!isDashboard && (
          <Row>
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
  additionalInfo: PropTypes.string,
  onClickSendMoney: PropTypes.func,
  onClickReceiveMoney: PropTypes.func,
  onClickWallet: PropTypes.func,
  isDashboard: PropTypes.bool,
};

CryptoWalletCard.defaultProps = {
  additionalInfo: '',
  onClickSendMoney: () => {},
  onClickReceiveMoney: () => {},
  onClickWallet: () => {},
  isDashboard: false,
};

export default CryptoWalletCard;
