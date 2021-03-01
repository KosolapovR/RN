import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import EditIcon from '../../../assets/img/edit-mobile.svg';
import IconButton from '../../buttons/IconButton';

const Container = styled.View`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius};
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

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

const WhiteText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;
const PrimaryText = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 10px;
  border-left-color: ${(props) => props.theme.main.colors.secondary};
  border-left-width: 1px;
`;

const SubsCount = ({value}) => {
  return value > 0 ? (
    <OrangeCircle>
      <WhiteText>{value}</WhiteText>
    </OrangeCircle>
  ) : (
    <BlackCircle>
      <PrimaryText>0</PrimaryText>
    </BlackCircle>
  );
};

const SubscriptionCard = ({count, description, onEdit, additionalInfo}) => {
  return (
    <Container>
      <LeftContainer>
        <SubsCount value={count} />
        <View>
          <WhiteText>{description}</WhiteText>
          <PrimaryText>{additionalInfo}</PrimaryText>
        </View>
      </LeftContainer>
      <RightContainer>
        <IconButton
          onClick={onEdit}
          icon={<EditIcon width={17} height={17} />}
        />
      </RightContainer>
    </Container>
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
