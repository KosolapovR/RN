import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {Column, PrimaryText} from 'components/styled';
import SuccessIcon from 'assets/completed.svg';
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

const colors = ['rgba(255,255,255, 0.01)', 'rgba(255,255,255, 0.15)'];

const Container = styled.View`
  position: absolute;
  top: -50px;
`;
function SuccessIconBlock() {
  const borderColorOuterRing = useSharedValue(0);
  const borderColorMiddleRing = useSharedValue(0);
  const borderColorInnerRing = useSharedValue(0);

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
    <Container>
      <Animated.View style={[outerRingAnimatedStyles, styles.ring]}>
        <Animated.View style={[middleRingAnimatedStyles, styles.ring]}>
          <Animated.View style={[innerRingAnimatedStyles, styles.ring]}>
            <SuccessIcon width={72} height={72} />
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
    borderRadius: 300,
    padding: 72,
  },
});

export default SuccessIconBlock;
