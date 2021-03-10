import React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import {
  Column,
  GreenText,
  ModalBody,
  PrimaryText,
  RedText,
  Row,
  RowEnd,
  RowSpaceBetween,
  SecondaryBoldText,
  SecondaryText,
  SecondaryTextSmall,
  WhiteBoldText,
  WhiteText,
} from 'components/styled';
import moment from 'moment/moment';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

import {TRANSACTION_TYPES} from 'shared/consts';

import ModalHeader from 'components/blocks/ModalHeader';
import BasicButton from 'components/buttons/BasicButton';
import {Image} from 'react-native-svg';
import styled from 'styled-components/native';
import Divider from 'components/Divider';

const StyledImage = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: ${({theme}) => theme.main.borderRadius};
  margin-right: 10px;
`;

function WithdrawConfirmModal({
  onClose,
  amount,
  currency,
  currencyIcon,
  partnerAddress,
  withMainerCommission,
  mainerCommission,
  onConfirm,
}) {
  return (
    <Column>
      <ModalHeader title="Вывод средств" onClose={onClose} />
      <ModalBody>
        <SecondaryText paddingBottom={3}>Я вывожу:</SecondaryText>
        <Row paddingBottom={15}>
          <StyledImage source={{uri: currencyIcon}} />
          <WhiteBoldText>
            {amount} {currency}
          </WhiteBoldText>
        </Row>
        <SecondaryText paddingBottom={3}>На {currency} кошелек:</SecondaryText>
        <WhiteText>{partnerAddress}</WhiteText>
        {withMainerCommission && (
          <>
            <Divider />
            <Row>
              <SecondaryText paddingRight={10}>Комиссия майнера:</SecondaryText>
              <WhiteText>
                {mainerCommission} {currency}
              </WhiteText>
            </Row>
          </>
        )}
        <BasicButton
          onClick={onConfirm}
          title="Подтвердить"
          color="primary"
          containerStyles={{marginTop: 20}}
        />
      </ModalBody>
    </Column>
  );
}

WithdrawConfirmModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencyIcon: PropTypes.string.isRequired,
  withMainerCommission: PropTypes.bool,
  mainerCommission: PropTypes.number,
  partnerAddress: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

WithdrawConfirmModal.defaultProps = {
  withMainerCommission: false,
  mainerCommission: 0,
};

export default WithdrawConfirmModal;
