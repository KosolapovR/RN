import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import PulsarLoader from 'components/loaders/PulsarLoader';
import {Row} from 'components/styled';

const StyledButton = styled.TouchableOpacity`
  background-color: ${(props) => {
    switch (props.color) {
      case 'primary':
        return `${props.theme.main.backgroundColors.blue}${
          props.isDisabled ? '99' : ''
        }`;
      case 'secondary':
        return `${props.theme.main.backgroundColors.primaryLighter2}${
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
  padding: 0 20px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border-width: ${(props) =>
    props.color === 'transparent-with-border' ? 1 : 0};
  border-color: ${(props) =>
    props.color === 'transparent-with-border'
      ? props.theme.main.colors.secondary
      : 'transparent'};
`;

const StyledText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => {
    switch (props.color) {
      case 'primary':
        return `#ffffff${props.isDisabled ? '99' : ''}`;
      case 'secondary':
        return `#b6b6b6${props.isDisabled ? '99' : ''}`;
      case 'danger':
        return `#ffffff${props.isDisabled ? '99' : ''}`;
      case 'danger-transparent':
        return '#ff4258';
      case 'transparent-with-border':
        return `#ffffff${props.isDisabled ? '99' : ''}`;
      case 'transparent':
        return `#b6b6b6${props.isDisabled ? '99' : ''}`;
      default:
        return '#444444';
    }
  }};
`;
const areEqual = (prevProps, nextProps) =>
  prevProps.title === nextProps.title &&
  prevProps.isDisabled === nextProps.isDisabled &&
  prevProps.color === nextProps.color &&
  prevProps.onClick === nextProps.onClick &&
  prevProps.isLoading === nextProps.isLoading;

const BasicButton = React.memo(
  ({onClick, title, isDisabled, isLoading, color, containerStyles}) => (
    <Row style={{flex: 0, ...containerStyles}}>
      <StyledButton
        color={color}
        onPress={!isDisabled ? onClick : null}
        activeOpacity={isDisabled ? 1 : 0.7}
        isDisabled={isDisabled || isLoading}>
        {isLoading ? (
          <PulsarLoader />
        ) : (
          <StyledText color={color} isDisabled={isDisabled}>
            {title}
          </StyledText>
        )}
      </StyledButton>
    </Row>
  ),
  areEqual,
);

BasicButton.propTypes = {
  title: PropTypes.arrayOf([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'danger',
    'danger-transparent',
    'transparent',
    'transparent-with-border',
  ]),
  containerStyles: PropTypes.object,
};

BasicButton.defaultProps = {
  title: '',
  isDisabled: false,
  isLoading: false,
  color: 'transparent',
  containerStyles: {},
};

export default BasicButton;
