import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import OwnerInfo from './OwnerInfo';
import RatingInfo from './RatingInfo';
import {duration} from 'moment/moment';

const Container = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius};
  padding: 20px;
  border-style: solid;
  border-left-width: ${(props) => (props.isOwn ? '3px' : 0)};
  border-left-color: ${(props) =>
    props.isOwn ? props.theme.main.backgroundColors.blue : 'transparent'};
`;

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: ${(props) => (props.halfOpacity ? 0.5 : 1)};
  padding-bottom: ${(props) => (props.paddingBottom ? props.paddingBottom : 0)};
`;

const SecondaryTextSmall = styled.Text`
  color: ${(props) => props.theme.main.colors.secondary};
  font-size: 12px;
`;

const PrimaryBoldText = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
  font-weight: bold;
  font-size: 16px;
`;

const MarketItemCard = ({
  isOwn,
  ownerName,
  isOwnerOnline,
  dealsCount,
  rating,
  directionsInfo,
  rateInfo,
  reaction,
  limitsInfo,
}) => {
  const dealsCountInfo = (() => {
    if (dealsCount % 10 === 1) {
      return `${dealsCount} сделка`;
    } else if (dealsCount % 10 >= 2 && dealsCount % 10 <= 4) {
      return `${dealsCount} сделки`;
    } else {
      return `${dealsCount} сделок`;
    }
  })();

  return (
    <Container isOwn={isOwn}>
      <StyledRow paddingBottom={15}>
        <OwnerInfo
          ownerName={ownerName}
          isOwn={isOwn}
          isOwnerOnline={isOwnerOnline}
        />
        <StyledRow>
          <SecondaryTextSmall>{dealsCountInfo}</SecondaryTextSmall>
          <RatingInfo rating={rating} />
        </StyledRow>
      </StyledRow>

      <StyledRow paddingBottom={15}>
        <PrimaryBoldText>{directionsInfo}</PrimaryBoldText>
        <PrimaryBoldText>{rateInfo}</PrimaryBoldText>
      </StyledRow>

      <StyledRow>
        <SecondaryTextSmall>
          {duration(reaction).minutes()} мин
        </SecondaryTextSmall>
        <SecondaryTextSmall>{limitsInfo}</SecondaryTextSmall>
      </StyledRow>
    </Container>
  );
};

MarketItemCard.propTypes = {
  isOwn: PropTypes.bool,
  ownerName: PropTypes.string,
  isOwnerOnline: PropTypes.bool,
  dealsCount: PropTypes.number.isRequired,
  rating: PropTypes.number,
  directionsInfo: PropTypes.string,
  limitsInfo: PropTypes.string.isRequired,
  rateInfo: PropTypes.string.isRequired,
  reaction: PropTypes.bool,
};

MarketItemCard.defaultProps = {
  isOwn: false,
  ownerName: '',
  isOwnerOnline: false,
  dealsCount: 0,
  rating: 0,
  reaction: 0,
};

export default MarketItemCard;
