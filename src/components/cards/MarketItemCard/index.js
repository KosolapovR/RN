import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import {
  SecondaryTextSmall,
  CardContainer,
  PrimaryBoldLargeText,
  RowSpaceBetween,
} from 'components/styled';
import ReactionTimeInfo from './ReactionTimeInfo';
import OwnerInfo from './OwnerInfo';
import RatingInfo from './RatingInfo';

const Container = styled(CardContainer)`
  border-style: solid;
  border-left-width: ${(props) => (props.isOwn ? '3px' : 0)};
  border-left-color: ${(props) =>
    props.isOwn ? props.theme.main.backgroundColors.blue : 'transparent'};
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
    <Container isOwn={isOwn} padding={20}>
      <RowSpaceBetween paddingBottom={15}>
        <OwnerInfo
          ownerName={ownerName}
          isOwn={isOwn}
          isOwnerOnline={isOwnerOnline}
        />
        <RowSpaceBetween>
          <SecondaryTextSmall>{dealsCountInfo}</SecondaryTextSmall>
          <RatingInfo rating={rating} />
        </RowSpaceBetween>
      </RowSpaceBetween>

      <RowSpaceBetween paddingBottom={15}>
        <PrimaryBoldLargeText>{directionsInfo}</PrimaryBoldLargeText>
        <PrimaryBoldLargeText>{rateInfo}</PrimaryBoldLargeText>
      </RowSpaceBetween>

      <RowSpaceBetween>
        <ReactionTimeInfo reaction={reaction} />
        <SecondaryTextSmall>{limitsInfo}</SecondaryTextSmall>
      </RowSpaceBetween>
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
