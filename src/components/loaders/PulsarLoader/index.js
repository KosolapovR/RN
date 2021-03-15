import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const PulsarLoader = ({size}) => {
  const outerSize = useSharedValue(0.1);
  const outerOpacity = useSharedValue(1);
  const innerSize = useSharedValue(0.1);
  const innerOpacity = useSharedValue(1);

  const outerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: outerSize.value,
      },
    ],
    opacity: outerOpacity.value,
  }));
  const innerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: innerSize.value,
      },
    ],
    opacity: innerOpacity.value,
  }));

  useEffect(() => {
    outerSize.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
    );
    outerOpacity.value = withDelay(
      0,
      withRepeat(
        withTiming(0, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      ),
    );

    innerSize.value = withDelay(
      500,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      ),
    );

    innerOpacity.value = withDelay(
      500,
      withRepeat(
        withTiming(0, {
          duration: 2000,
          easing: Easing.linear,
        }),
        -1,
      ),
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[outerAnimatedStyles, styles.outer, {width: size, height: size}]}
      />
      <Animated.View
        style={[innerAnimatedStyles, styles.inner, {width: size, height: size}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outer: {
    borderRadius: 30,
    borderColor: '#b6b6b6',
    borderStyle: 'solid',
    borderWidth: 2,
    position: 'absolute',
  },
  inner: {
    borderRadius: 30,
    borderColor: '#b6b6b6',
    borderStyle: 'solid',
    borderWidth: 1,
    position: 'absolute',
  },
});

PulsarLoader.propTypes = {
  size: PropTypes.number,
};
PulsarLoader.defaultProps = {
  size: 30,
};

export default PulsarLoader;
