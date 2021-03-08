import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@react-navigation/native';

import {TRANSACTION_TYPES} from 'shared/consts';

import {BlueBoldText, PrimaryText, Row} from 'components/styled';

function TransactionType({
  type,
  dealId,
  toUserId,
  toUsername,
  fromUserId,
  fromUsername,
  dealNumber,
}) {
  if (dealId) {
    return (
      <Row>
        <BlueBoldText>
          <Link to={`/deals/${dealId}`}>Сделка #{dealNumber}</Link>
        </BlueBoldText>
      </Row>
    );
  }
  if (fromUserId && fromUsername && type === TRANSACTION_TYPES.TRANSFER_FROM) {
    return (
      <Row>
        <PrimaryText paddingRigh={50}>От</PrimaryText>
        <BlueBoldText>
          <Link to={`/user/${fromUserId}`}>{fromUsername}</Link>
        </BlueBoldText>
      </Row>
    );
  }

  if (toUserId && toUsername && type === TRANSACTION_TYPES.TRANSFER_TO) {
    return (
      <Row>
        <PrimaryText paddingRigh={10}>Отправка к </PrimaryText>
        <BlueBoldText>
          <Link to={`/user/${toUserId}`}>{toUsername}</Link>
        </BlueBoldText>
      </Row>
    );
  }
  return type === TRANSACTION_TYPES.TRANSFER_FROM ? (
    <PrimaryText>Получение</PrimaryText>
  ) : (
    <PrimaryText>Отправка</PrimaryText>
  );
}

TransactionType.propTypes = {
  type: PropTypes.string.isRequired,
  dealId: PropTypes.string,
  dealNumber: PropTypes.number,
  toUserId: PropTypes.string,
  toUsername: PropTypes.string,
  fromUserId: PropTypes.string,
  fromUsername: PropTypes.string,
  withCircle: PropTypes.bool,
  date: PropTypes.string.isRequired,
};

TransactionType.defaultProps = {
  dealId: '',
  dealNumber: null,
  toUserId: '',
  toUsername: '',
  fromUserId: '',
  fromUsername: '',
  withCircle: true,
};

export default TransactionType;
