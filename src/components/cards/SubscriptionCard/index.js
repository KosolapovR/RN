import * as React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from 'styled-components/native';

import IconButton from 'components/buttons/IconButton';
import {
  CardContainer,
  PrimaryText,
  Row,
  RowSpaceBetween,
  WhiteBoldText,
} from 'components/styled';
import EditIcon from 'assets/img/edit-mobile.svg';

const Circle = styled.View`
  width: 25px;
  height: 25px;
  margin-right: 15px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const OrangeCircle = styled(Circle)`
  background-color: ${(props) => props.theme.main.colors.orange};
`;

const BlackCircle = styled(Circle)`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
`;

const RowWithBorder = styled(Row)`
  justify-content: center;
  padding: 0 0 0 10px;
  border-left-color: ${(props) => props.theme.main.colors.secondary};
  border-left-width: 1px;
`;

const SubsCount = ({value}) => {
  return value > 0 ? (
    <OrangeCircle>
      <WhiteBoldText>{value}</WhiteBoldText>
    </OrangeCircle>
  ) : (
    <BlackCircle>
      <PrimaryText>0</PrimaryText>
    </BlackCircle>
  );
};

const SubscriptionCard = ({count, description, onEdit, additionalInfo}) => {
  return (
    <CardContainer padding={15}>
      <RowSpaceBetween>
        <Row>
          <SubsCount value={count} />
          <View>
            <WhiteBoldText>{description}</WhiteBoldText>
            <PrimaryText>{additionalInfo}</PrimaryText>
          </View>
        </Row>
        <RowWithBorder>
          <IconButton
            onClick={onEdit}
            icon={<EditIcon width={17} height={17} />}
          />
        </RowWithBorder>
      </RowSpaceBetween>
    </CardContainer>
  );
};

SubscriptionCard.propTypes = {
  count: PropTypes.number,
  description: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  additionalInfo: PropTypes.string,
};

SubscriptionCard.defaultProps = {
  count: 0,
  additionalInfo: '',
  onEdit: () => {},
};

export default SubscriptionCard;
