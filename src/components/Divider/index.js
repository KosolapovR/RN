import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

const StyledView = styled.View`
  height: ${({height}) => (height ? `${height}px` : '1px')};
  background-color: ${({black}) => (black ? '#000000' : '#ffffff')};
  opacity: ${({black}) => (black ? 1 : 0.07)};
  position: ${({fullWidth}) => (fullWidth ? 'absolute' : 'relative')};
  left: ${({fullWidth}) => (fullWidth ? '-20px' : '0')};
  bottom: ${({fullWidth}) => (fullWidth ? '0' : '0')};
  width: ${({fullWidth, width}) => (fullWidth ? width : '100%')};
  margin: ${({fullWidth}) => (fullWidth ? 0 : '20px 0')};
`;

function Divider({...rest}) {
  return <StyledView {...rest} width={windowWidth} />;
}

Divider.propTypes = {
  height: PropTypes.number,
  fullWidth: PropTypes.bool,
  black: PropTypes.bool,
};

Divider.defaultProps = {
  height: 1,
  fullWidth: false,
  black: false,
};

export default Divider;
