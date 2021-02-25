import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: ${props => props.theme.main.colors.primary};
  padding-bottom: ${props => props.paddingBottom};
`;

const AttentionBlock = ({text, paddingBottom}) => {
  return <StyledText paddingBottom={paddingBottom}>{text}</StyledText>;
};

AttentionBlock.propTypes = {
  text: PropTypes.string.isRequired,
  paddingBottom: PropTypes.number,
};

AttentionBlock.defaultProps = {
  paddingBottom: 0,
};

export default AttentionBlock;
