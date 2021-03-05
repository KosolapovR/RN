import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

import {Column, RowSpaceBetween, SecondaryText} from 'components/styled';
import SelectedCryptoItem from 'components/blocks/SelectedCryptoBlock/SelectedCryptoItem';

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

function SelectedCryptoBlock({items}) {
  const handleClickItem = (id) => {
    items[id].selected = !items[id].selected;
    console.log(id);
  };
  return (
    <Column>
      <SecondaryText paddingBottom={10}>
        Интересующие меня валюты (до 3-х):
      </SecondaryText>
      <RowSpaceBetween
        style={{
          flexWrap: 'wrap',
        }}>
        {items.map((i) => (
          <SelectedCryptoItem
            key={i.id}
            currency={i.currency}
            currencyIcon={i.currencyIcon}
          />
        ))}
      </RowSpaceBetween>
    </Column>
  );
}

SelectedCryptoBlock.propTypes = {
  amount: PropTypes.number.isRequired,
  lockedAmount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
  onReceive: PropTypes.func.isRequired,
  currencyIcon: PropTypes.string.isRequired,
};

export default SelectedCryptoBlock;
