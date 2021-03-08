import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {PrimarySmallText, PrimaryText, Row} from 'components/styled';

const IconWrapper = styled.View`
  margin: 0 6px;
`;

function RatingInfo({rating, small}) {
  const starColor = (() => {
    if (rating >= 4) {
      return '#6eab27';
    } else if (rating > 0) {
      return '#F4C25A';
    } else {
      return '#b1b1b1';
    }
  })();
  return (
    <Row>
      <IconWrapper>
        <Icon name="star" size={10} color={starColor} />
      </IconWrapper>
      <View>
        {small ? (
          <PrimarySmallText>
            {rating ? rating.toFixed(1) : '0.0'}
          </PrimarySmallText>
        ) : (
          <PrimaryText>{rating ? rating.toFixed(1) : '0.0'}</PrimaryText>
        )}
      </View>
    </Row>
  );
}

RatingInfo.propTypes = {
  rating: PropTypes.number,
};

RatingInfo.defaultProps = {
  rating: 0,
};

export default RatingInfo;
