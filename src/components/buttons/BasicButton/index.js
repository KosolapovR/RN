import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => {
    switch (props.color) {
      case 'primary':
        return `${props.theme.main.backgroundColors.blue}${
          props.isDisabled ? '99' : ''
        }`;
      case 'secondary':
        return `${props.theme.main.backgroundColors.primaryLighterHover}${
          props.isDisabled ? '99' : ''
        }`;
      case 'danger':
        return `rgba(255, 66, 88, ${props.isDisabled ? 0.5 : 1} )`;
      case 'danger-transparent':
        return 'rgba(255, 66, 88, 0.07)';
      default:
        return 'transparent';
    }
  }};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 5px;
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${props => {
    switch (props.color) {
      case 'primary':
        return `#ffffff${props.isDisabled ? '99' : ''}`;
      case 'secondary':
        return `#b6b6b6${props.isDisabled ? '99' : ''}`;
      case 'danger':
        return `#ffffff${props.isDisabled ? '99' : ''}`;
      case 'danger-transparent':
        return '#ff4258';
      case 'transparent':
        return `#ffffff${props.isDisabled ? '99' : ''}`;
      default:
        return '#444444';
    }
  }};
`;

const BasicButton = ({onClick, title, isDisabled, color}) => {
  return (
    <StyledButton
      color={color}
      onPress={!isDisabled ? onClick : null}
      activeOpacity={isDisabled ? 1 : 0.7}
      isDisabled={isDisabled}>
      <StyledText color={color} isDisabled={isDisabled}>
        {title}
      </StyledText>
    </StyledButton>
  );
};

BasicButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'danger-transparent',
    'transparent',
  ]),
};

BasicButton.defaultProps = {
  title: '',
  isDisabled: false,
  color: 'transparent',
};

export default BasicButton;
