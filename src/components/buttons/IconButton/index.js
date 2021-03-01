import * as React from 'react';
import PropTypes from 'prop-types';
import {Pressable, View} from 'react-native';

const IconButton = ({
  onClick,
  icon,
  isDisabled,
  containerStyles,
  dinamicRef,
}) => {
  return (
    <Pressable
      ref={dinamicRef}
      style={containerStyles}
      hitSlop={10}
      onPress={!isDisabled && onClick}
      isDisabled={isDisabled}>
      {({pressed}) => <View style={{opacity: pressed ? 0.5 : 1}}>{icon}</View>}
    </Pressable>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  containerStyles: PropTypes.object,
};

IconButton.defaultProps = {
  isDisabled: false,
  containerStyles: {},
};

export default IconButton;
