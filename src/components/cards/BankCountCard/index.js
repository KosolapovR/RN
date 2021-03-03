import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View} from 'react-native';
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

const BankCountCard = ({icon, bankName, additionalInfo, onClick, currency}) => {
  return (
    <CardContainer padding={15} onPress={onClick}>
      <RowSpaceBetween>
        <Row>
          <StyledIcon
            source={{
              uri: icon,
            }}
          />
          <View>
            <WhiteBoldText>{bankName}</WhiteBoldText>
            <PrimaryText>{additionalInfo}</PrimaryText>
          </View>
        </Row>
        <Row>
          <PrimaryText>{currency}</PrimaryText>
        </Row>
      </RowSpaceBetween>
    </CardContainer>
  );
};

BankCountCard.propTypes = {
  icon: PropTypes.string.isRequired,
  bankName: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string,
  onClick: PropTypes.func,
};

BankCountCard.defaultProps = {
  additionalInfo: '',
  onClick: () => {},
};

export default BankCountCard;
