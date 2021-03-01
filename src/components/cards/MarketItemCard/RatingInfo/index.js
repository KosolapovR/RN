import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const PrimarySmallText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.main.colors.primary};
`;
const IconWrapper = styled.View`
  margin: 0 6px;
`;

function RatingInfo({rating}) {
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
        <PrimarySmallText>{rating}</PrimarySmallText>
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
