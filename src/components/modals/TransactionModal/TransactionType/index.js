import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@react-navigation/native';

import {TYPE_TRANSACTION} from 'shared/consts';

import {BlueBoldText, Row} from 'components/styled';

function TransactionType({
  type,
  dealId,
  toUserId,
  toUsername,
  fromUserId,
  fromUsername,
  dealNumber,
  date,
}) {
  return (
    <Row>
      {dealId ? (
        <BlueBoldText>
          <Link to={`/deals/${dealId}`}>Сделка #{dealNumber}</Link>
        </BlueBoldText>
      ) : toUserId && fromUserId ? (
        type === TYPE_TRANSACTION.TRANSFER_FROM ? (
          <>
            <Row>
              <Link to={`/user/${toUsername}`}>{toUsername}</Link>
            </Row>
          </>
        ) : (
          <>
            <Link to={`/user/${fromUsername}`}>{fromUsername}</Link>
          </>
        )
      ) : type === TYPE_TRANSACTION.TRANSFER_FROM ? (
        'SENDING'
      ) : (
        'RECEIVING'
      )}
    </Row>
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
