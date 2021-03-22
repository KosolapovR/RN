import * as React from 'react';
import PropTypes from 'prop-types';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  opacity: ${(props) => (props.pressed ? 0.5 : 1)};
  background-color: ${({transparent, theme}) =>
    transparent ? 'transparent' : theme.main.backgroundColors.primaryLighter};
  width: 34px;
  height: 34px;
  margin-left: ${(props) =>
    typeof props.marginLeft !== 'undefined' ? `${props.marginLeft}px` : '0px'};
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.main.borderRadius};
`;

const IconButton = ({
  onClick,
  onLongPress,
  icon,
  isDisabled,
  containerStyles,
  dinamicRef,
  marginLeft,
  backgroundTransparent,
}) => {
  return (
    <Pressable
      ref={dinamicRef}
      style={containerStyles}
      hitSlop={10}
      onPress={!isDisabled && onClick}
      onLongPress={onLongPress}
      isDisabled={isDisabled}>
      {({pressed}) => (
        <Container
          pressed={pressed}
          marginLeft={marginLeft}
          transparent={backgroundTransparent}>
          {icon}
        </Container>
      )}
    </Pressable>
  );
};

IconButton.propTypes = {
  icon: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  containerStyles: PropTypes.object,
  onLongPress: PropTypes.func,
  marginLeft: PropTypes.number,
  backgroundTransparent: PropTypes.bool,
};

IconButton.defaultProps = {
  isDisabled: false,
  containerStyles: {},
  marginLeft: 0,
  onLongPress: () => {},
  backgroundTransparent: false,
};

export default IconButton;
