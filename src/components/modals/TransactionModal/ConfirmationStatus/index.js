import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {GreenText, PrimaryText, RedText, Row} from 'components/styled';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  Easing,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 18px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.main.backgroundColors.green};
`;

const BrownIconWrapper = styled(IconWrapper)`
  background-color: #f7924e;
`;

function ConfirmationStatus({minConfirmations, countOfConfirmations}) {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, []);

  if (typeof countOfConfirmations === 'undefined') {
    return <RedText>Неподтвержденная транзакция</RedText>;
  }

  return minConfirmations <= countOfConfirmations ? (
    <Row>
      <IconWrapper>
        <FontAwesome5 name="check" size={10} color={'#ffffff'} />
      </IconWrapper>
      <GreenText>транзакция подтверждена</GreenText>
    </Row>
  ) : (
    <Row>
      <BrownIconWrapper>
        <Animated.View style={animatedStyle}>
          <Icon size={13} name="rotate-right" color="#FFF" />
        </Animated.View>
      </BrownIconWrapper>
      <PrimaryText>
        {countOfConfirmations}/{minConfirmations} подтверждений
      </PrimaryText>
    </Row>
  );
}

ConfirmationStatus.propTypes = {
  minConfirmations: PropTypes.number.isRequired,
  countOfConfirmations: PropTypes.number,
};

ConfirmationStatus.defaultProps = {
  countOfConfirmations: undefined,
};

export default ConfirmationStatus;
