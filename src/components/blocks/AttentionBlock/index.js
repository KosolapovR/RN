import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import {PrimaryText} from 'components/styled';

const PrimaryTextWithPadding = styled(PrimaryText)`
  padding-bottom: ${(props) => `${props.paddingBottom}px`};
`;

const AttentionBlock = ({text, paddingBottom}) => {
  return (
    <PrimaryTextWithPadding paddingBottom={paddingBottom}>
      {text}
    </PrimaryTextWithPadding>
  );
};

AttentionBlock.propTypes = {
  text: PropTypes.string.isRequired,
  paddingBottom: PropTypes.number,
};

AttentionBlock.defaultProps = {
  paddingBottom: 0,
};

export default AttentionBlock;
