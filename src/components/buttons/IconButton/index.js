import * as React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  opacity: ${(props) => (props.pressed ? 0.5 : 1)};
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.main.borderRadius};
`;

const IconButton = ({
  onClick,
  onLongPress,
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
      onLongPress={onLongPress}
      isDisabled={isDisabled}>
      {({pressed}) => <Container pressed={pressed}>{icon}</Container>}
    </Pressable>
  );
};

IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  containerStyles: PropTypes.object,
  onLongPress: PropTypes.func,
};

IconButton.defaultProps = {
  isDisabled: false,
  containerStyles: {},
  onLongPress: () => {},
};

export default IconButton;
