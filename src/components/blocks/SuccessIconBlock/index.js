import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import styled from 'styled-components/native';

const windowHeight = Dimensions.get('window').height;

import SuccessIcon from 'assets/img/completed.svg';
import SuccessRegistrationIcon from 'assets/img/group-3.svg';

const colors = ['rgba(255,255,255, 0.01)', 'rgba(255,255,255, 0.15)'];

const Container = styled.View`
  position: absolute;
  top: ${({offsetTop}) => `-${offsetTop}px`};
`;
function SuccessIconBlock({type}) {
  const borderColorOuterRing = useSharedValue(0);
  const borderColorMiddleRing = useSharedValue(0);
  const borderColorInnerRing = useSharedValue(0);
  console.log('windowHeight', windowHeight);
  const outerRingAnimatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(borderColorOuterRing.value, [0, 1], colors),
    };
  });
  const middleRingAnimatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        borderColorMiddleRing.value,
        [0, 1],
        colors,
      ),
    };
  });
  const innerRingAnimatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(borderColorInnerRing.value, [0, 1], colors),
    };
  });

  useEffect(() => {
    borderColorInnerRing.value = withRepeat(
      withTiming(1, {duration: 3000, easing: Easing.cubic}),
      -1,
    );

    borderColorMiddleRing.value = withDelay(
      100,
      withRepeat(withTiming(1, {duration: 3000, easing: Easing.cubic}), -1),
    );

    borderColorOuterRing.value = withDelay(
      200,
      withRepeat(withTiming(1, {duration: 3000, easing: Easing.cubic}), -1),
    );
  }, []);
  return (
    <Container offsetTop={(900 - windowHeight) / 3}>
      <Animated.View style={[outerRingAnimatedStyles, styles.ring]}>
        <Animated.View style={[middleRingAnimatedStyles, styles.ring]}>
          <Animated.View style={[innerRingAnimatedStyles, styles.ring]}>
            {type === 'check' ? (
              <SuccessIcon width={72} height={72} />
            ) : (
              <SuccessRegistrationIcon width={72} height={72} />
            )}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 500,
    padding: 68,
  },
});

SuccessIconBlock.propTypes = {
  type: PropTypes.oneOf(['check', 'mail']),
};

SuccessIconBlock.defaultProps = {
  type: 'check',
};

export default SuccessIconBlock;
