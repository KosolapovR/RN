import React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import {
  Column,
  GreenText,
  ModalBody,
  PrimaryText,
  RedText,
  RowEnd,
  RowSpaceBetween,
  SecondaryBoldText,
  SecondaryText,
  SecondaryTextSmall,
} from 'components/styled';
import moment from 'moment/moment';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

import {TRANSACTION_TYPES} from '@cashelec/shared/consts';

import ModalHeader from 'components/blocks/ModalHeader';
import TransactionType from 'components/modals/TransactionModal/TransactionType';
import ConfirmationStatus from 'components/modals/TransactionModal/ConfirmationStatus';
import BasicButton from 'components/buttons/BasicButton';

function TransactionModal({
  onClose,
  type,
  amount,
  currency,
  amountInUSD,
  date,
  dealNumber,
  hash,
  address,
  partnerAddress,
  countOfConfirmations,
  dealId,
  toUserId,
  toUsername,
  fromUserId,
  fromUsername,
  minConfirmations,
  goToBlockchainExplorer,
}) {
  const btnOpacity = useSharedValue(0);
  const btnHeight = useSharedValue(0);
  const textOpacity = useSharedValue(1);
  const textHeight = useSharedValue(40);

  const animatedButtonStyles = useAnimatedStyle(() => {
    return {
      opacity: btnOpacity.value,
      height: btnHeight.value,
    };
  });
  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      height: textHeight.value,
    };
  });

  const handleShowMore = () => {
    btnOpacity.value = withDelay(
      250,
      withTiming(1, {
        duration: 250,
        easing: Easing.cubic,
      }),
    );
    btnHeight.value = withTiming(40, {
      duration: 250,
      easing: Easing.cubic,
    });
    textOpacity.value = withTiming(0, {
      duration: 250,
      easing: Easing.cubic,
    });
    textHeight.value = withTiming(0, {
      duration: 250,
      easing: Easing.cubic,
    });
  };

  return (
    <Column>
      <ModalHeader title="Детали транзакции" onClose={onClose} />
      <ModalBody>
        <RowSpaceBetween paddingBottom={10}>
          <SecondaryText>Тип:</SecondaryText>
          <TransactionType
            type={type}
            dealId={dealId}
            dealNumber={dealNumber}
            date={date}
            toUserId={toUserId}
            toUsername={toUsername}
            fromUserId={fromUserId}
            fromUsername={fromUsername}
          />
        </RowSpaceBetween>
        <RowSpaceBetween>
          <SecondaryText>Сумма транзакции:</SecondaryText>
          {type === TRANSACTION_TYPES.TRANSFER_FROM ? (
            <GreenText>
              +{amount} {currency}
            </GreenText>
          ) : (
            <RedText>
              -{amount} {currency}
            </RedText>
          )}
        </RowSpaceBetween>
        <RowEnd paddingBottom={10}>
          <SecondaryTextSmall>${amountInUSD}</SecondaryTextSmall>
        </RowEnd>
        <RowSpaceBetween paddingBottom={10}>
          <SecondaryText>Дата:</SecondaryText>
          <PrimaryText>{moment(date).format('DD MMM YYYY')}</PrimaryText>
        </RowSpaceBetween>
        <RowSpaceBetween paddingBottom={10}>
          <SecondaryText>Статус:</SecondaryText>
          <ConfirmationStatus
            minConfirmations={minConfirmations}
            countOfConfirmations={countOfConfirmations}
          />
        </RowSpaceBetween>
        <Column paddingBottom={10}>
          <SecondaryText>HASH транзакции:</SecondaryText>
          <PrimaryText>{hash}</PrimaryText>
        </Column>
        <Column paddingBottom={10}>
          <SecondaryText>Откуда::</SecondaryText>
          <PrimaryText>{partnerAddress}</PrimaryText>
        </Column>
        <Column paddingBottom={20}>
          <SecondaryText>Куда:</SecondaryText>
          <PrimaryText>{address}</PrimaryText>
        </Column>
        {typeof goToBlockchainExplorer === 'function' && (
          <>
            <Animated.View style={animatedTextStyles}>
              <Pressable onPress={handleShowMore}>
                <SecondaryBoldText>Показать еще</SecondaryBoldText>
              </Pressable>
            </Animated.View>
            <Animated.View style={animatedButtonStyles}>
              <BasicButton
                onClick={goToBlockchainExplorer}
                title="Посмотреть в blockchain explorer"
                color="primary"
              />
            </Animated.View>
          </>
        )}
      </ModalBody>
    </Column>
  );
}

TransactionModal.propTypes = {
  /**
   * callback fire when click close button
   */
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  amountInUSD: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  dealNumber: PropTypes.number,
  hash: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  partnerAddress: PropTypes.string.isRequired,
  countOfConfirmations: PropTypes.number.isRequired,
  dealId: PropTypes.string,
  toUserId: PropTypes.string,
  toUsername: PropTypes.string,
  fromUserId: PropTypes.string,
  fromUsername: PropTypes.string,
  minConfirmations: PropTypes.number.isRequired,
  goToBlockchainExplorer: PropTypes.oneOfType([PropTypes.func, null]),
};

TransactionModal.defaultProps = {
  dealNumber: null,
  dealId: '',
  toUserId: '',
  toUsername: '',
  fromUserId: '',
  fromUsername: '',
  goToBlockchainExplorer: null,
};

export default TransactionModal;
