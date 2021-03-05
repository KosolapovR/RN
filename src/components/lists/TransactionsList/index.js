import React, {useCallback, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {
  PrimaryBoldText,
  Row,
  RowSpaceBetween,
  SecondaryBoldText,
} from 'components/styled';
import TransactionItemCard from 'components/cards/TransactionItemCard';
import styled from 'styled-components/native';
import BasicButton from 'components/buttons/BasicButton';

const ItemWrapper = styled.View`
  padding: 10px 0;
`;
const TransactionsList = ({transactions}) => {
  const [isShowAll, setShowAll] = useState(false);

  const handleShowAll = useCallback(() => {
    setShowAll(!isShowAll);
  }, []);

  const handleWalletClick = () => {};

  return (
    <View style={{flex: 1}}>
      <RowSpaceBetween>
        <SecondaryBoldText paddingBottom={15}>
          История транзакций
        </SecondaryBoldText>
        <BasicButton
          onClick={handleShowAll}
          title="Посмотреть все"
          containerStyles={{paddingBottom: 15}}
        />
      </RowSpaceBetween>
      <ScrollView>
        {transactions.length && isShowAll
          ? transactions.map((t) => (
              <TransactionItemCard
                key={t.id}
                createdDate={t.createdDate}
                currency={t.currency}
                amount={t.amount}
                type={t.type}
                dealNumber={t.dealNumber}
                amountInUSD={t.amountInUSD}
              />
            ))
          : transactions
              .slice(transactions.length - 2)
              .map((t) => (
                <TransactionItemCard
                  key={t.id}
                  createdDate={t.createdDate}
                  currency={t.currency}
                  amount={t.amount}
                  type={t.type}
                  dealNumber={t.dealNumber}
                  amountInUSD={t.amountInUSD}
                />
              ))}
      </ScrollView>
    </View>
  );
};

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      amountInUSD: PropTypes.number,
      onClick: PropTypes.func,
      createdDate: PropTypes.string.isRequired,
    }),
  ),
};

TransactionsList.defaultProps = {
  transactions: [],
};

export default TransactionsList;
