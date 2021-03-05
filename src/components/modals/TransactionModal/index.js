import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {
  RedText,
  Column,
  GreenText,
  ModalBody,
  PrimaryText,
  RowSpaceBetween,
  SecondaryText,
  RowEnd,
  SecondaryTextSmall,
} from 'components/styled';
import ModalHeader from 'components/blocks/ModalHeader';
import {TRANSACTION_TYPES} from 'shared/consts';
import moment from 'moment/moment';
import TransactionType from 'components/modals/TransactionModal/TransactionType';

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
  exchangeRate,
  countOfConfirmations,
  dealId,
  toUserId,
  toUsername,
  fromUserId,
  fromUsername,
  minConfirmations,
}) {
  return (
    <Column>
      <ModalHeader title="Детали транзакции" onClose={onClose} />
      <ModalBody>
        <RowSpaceBetween paddingBottom={10}>
          <SecondaryText>Тип:</SecondaryText>
          <TransactionType dealId={'11'} dealNumber={23} />
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
      </ModalBody>
    </Column>
  );
}

TransactionModal.propTypes = {
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
};

TransactionModal.defaultProps = {
  dealNumber: null,
  dealId: '',
  toUserId: '',
  toUsername: '',
  fromUserId: '',
  fromUsername: '',
};

export default TransactionModal;
