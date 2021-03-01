import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const PrimarySmallText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.main.colors.primary};
`;
const Dot = styled.View`
  width: 5px;
  height: 5px;
  margin-right: 10px;
  border-radius: 5px;
`;
const BlueDot = styled(Dot)`
  background-color: ${(props) => props.theme.main.backgroundColors.blue};
`;
const GreenDot = styled(Dot)`
  background-color: ${(props) => props.theme.main.backgroundColors.green};
`;
const GrayDot = styled(Dot)`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
`;

function OwnerInfo({isOwn, ownerName, isOwnerOnline}) {
  return (
    <Row>
      {isOwn ? <BlueDot /> : isOwnerOnline ? <GreenDot /> : <GrayDot />}
      <View>
        <PrimarySmallText>
          {isOwn ? 'Ваше объявление' : ownerName}
        </PrimarySmallText>
      </View>
    </Row>
  );
}

OwnerInfo.propTypes = {
  isOwn: PropTypes.bool,
  ownerName: PropTypes.string,
  isOwnerOnline: PropTypes.bool,
};

OwnerInfo.defaultProps = {
  isOwn: false,
  ownerName: '',
  isOwnerOnline: false,
};

export default OwnerInfo;
