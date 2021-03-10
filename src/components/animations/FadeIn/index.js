import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

function FadeIn({children, duration}) {
  const opacity = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration,
      easing: Easing.cubic,
    });
  }, [children]);

  return <Animated.View style={animatedStyles}>{children}</Animated.View>;
}

FadeIn.propTypes = {
  children: PropTypes.element.isRequired,
  duration: PropTypes.number,
};

FadeIn.defaultProps = {
  duration: 300,
};

export default FadeIn;
