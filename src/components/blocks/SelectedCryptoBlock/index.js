import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions, Image, View} from 'react-native';

import {
  ColumnAlignCenter,
  Row,
  RowSpaceAround,
  SecondaryText,
  WhiteBoldText,
  WhiteExtraLargeText,
} from 'components/styled';
import BasicButton from 'components/buttons/BasicButton';
import SendIcon from 'assets/img/arrows/send-arrow-white.svg';
import ReceiveIcon from 'assets/img/arrows/receive-arrow-white.svg';
import LockIcon from 'assets/img/lock-white.svg';

const Container = styled.View`
  height: ${(props) => `${props.height}px`};
]`;

const IconWrapper = styled.View`
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
`;

const windowWidth = Dimensions.get('window').width;

function WalletHeaderBlock({
  amount,
  lockedAmount,
  currency,
  onSend,
  onReceive,
  currencyIcon,
}) {
  return (
    <Container height={windowWidth / 2.5}>
      <LinearGradient
        colors={['#004594', '#006ae4']}
        style={{
          flex: 1,
          paddingTop: 50,
          paddingBottom: 20,
          justifyContent: 'space-between',
          borderRadius: 5,
        }}>
        <ColumnAlignCenter>
          <WhiteExtraLargeText paddingBottom={3}>
            {amount} {currency}
          </WhiteExtraLargeText>
          <Row>
            <LockIcon
              width={12}
              height={12}
              style={{opacity: 0.5, marginRight: 5}}
            />
            <SecondaryText>
              {lockedAmount} {currency}
            </SecondaryText>
          </Row>
        </ColumnAlignCenter>
        <RowSpaceAround>
          <BasicButton
            onClick={onReceive}
            title={
              <Row>
                <ReceiveIcon
                  width={15}
                  height={15}
                  style={{marginRight: 8, opacity: 0.7}}
                />
                <WhiteBoldText>Пополнить</WhiteBoldText>
              </Row>
            }
          />
          <BasicButton
            onClick={onSend}
            title={
              <Row>
                <SendIcon
                  width={15}
                  height={15}
                  style={{marginRight: 8, opacity: 0.7}}
                />
                <WhiteBoldText>Отправить</WhiteBoldText>
              </Row>
            }
          />
        </RowSpaceAround>
      </LinearGradient>
      <IconWrapper>
        <Image
          source={{
            uri: currencyIcon,
          }}
          style={{
            width: 48,
            height: 48,
          }}
        />
      </IconWrapper>
    </Container>
  );
}

WalletHeaderBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  lockedAmount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
  onReceive: PropTypes.func.isRequired,
  currencyIcon: PropTypes.string.isRequired,
};

export default WalletHeaderBlock;
