import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View, TouchableOpacity} from 'react-native';
import {
  GreenText,
  PrimaryBoldText,
  PrimaryText,
  Row,
  RowSpaceBetween,
  SecondaryText,
} from 'components/styled';
import ArrowDown from 'assets/img/arrows/receive-arrow-green.svg';
import ArrowUp from 'assets/img/arrows/send-arrow-white.svg';

const IconWrapper = styled.View`
  height: 45px;
  width: 45px;
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius};
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const MiddleView = styled.View`
  padding: 15px 0;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
`;
const AlignRightView = styled.View`
  align-items: flex-end;
  flex: 1;
  padding: 15px 0;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
`;
function TransactionItemCard({
  type,
  dealNumber,
  createdDate,
  amount,
  amountInUSD,
  currency,
  onClick,
}) {
  const transactionTitle = useMemo(() => {
    if (dealNumber) {
      return `Сделка №${dealNumber}`;
    }

    switch (type) {
      case 'transfer-to': {
        return 'Получение';
      }
      case 'transfer-from': {
        return 'Отправка';
      }
    }
  }, [type, dealNumber]);
  return (
    <TouchableOpacity onpress={onClick}>
      <RowSpaceBetween>
        <Row>
          <IconWrapper>
            {type === 'transfer-to' ? (
              <ArrowDown width={13} height={13} />
            ) : (
              <ArrowUp width={13} height={13} style={{opacity: 0.7}} />
            )}
          </IconWrapper>
          <MiddleView>
            <PrimaryBoldText>{transactionTitle}</PrimaryBoldText>
            <SecondaryText>{createdDate}</SecondaryText>
          </MiddleView>
        </Row>
        <AlignRightView>
          {type === 'transfer-to' ? (
            <GreenText>
              +{amount} {currency}
            </GreenText>
          ) : (
            <PrimaryText>
              -{amount} {currency}
            </PrimaryText>
          )}
          {amountInUSD && <SecondaryText>${amountInUSD}</SecondaryText>}
        </AlignRightView>
      </RowSpaceBetween>
    </TouchableOpacity>
  );
}

TransactionItemCard.propTypes = {
  type: PropTypes.oneOf(['transfer-to', 'transfer-from']).isRequired,
  dealNumber: PropTypes.number,
  createdDate: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  amountInUSD: PropTypes.number,
  onClick: PropTypes.func,
};

TransactionItemCard.defaultProps = {
  dealNumber: null,
  amountInUSD: null,
  onClick: () => {},
};

export default TransactionItemCard;
