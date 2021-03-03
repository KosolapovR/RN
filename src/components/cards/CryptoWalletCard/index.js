import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View} from 'react-native';
import SendIcon from '../../../assets/img/arrows/send-arrow-white.svg';
import ReceiveIcon from '../../../assets/img/arrows/receive-arrow-white.svg';
import IconButton from '../../buttons/IconButton';
import {
  CardContainer,
  PrimaryText,
  Row,
  RowSpaceBetween,
  WhiteBoldText,
} from '../../styled';

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
}) => {
  return (
    <CardContainer padding={15} onPress={onClickWallet}>
      <RowSpaceBetween>
        <Row>
          <StyledIcon
            source={{
              uri: icon,
            }}
          />
          <View>
            <WhiteBoldText>{walletName}</WhiteBoldText>
            <PrimaryText>{additionalInfo}</PrimaryText>
          </View>
        </Row>
        <Row>
          <IconButton
            onClick={onClickSendMoney}
            containerStyles={{marginRight: 10}}
            icon={<SendIcon width={17} height={17} style={{opacity: 0.6}} />}
          />
          <IconButton
            onClick={onClickReceiveMoney}
            icon={<ReceiveIcon width={17} height={17} style={{opacity: 0.6}} />}
          />
        </Row>
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
};

CryptoWalletCard.defaultProps = {
  additionalInfo: '',
  onClickSendMoney: () => {},
  onClickReceiveMoney: () => {},
  onClickWallet: () => {},
};

export default CryptoWalletCard;
