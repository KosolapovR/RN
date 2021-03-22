import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import CopyIcon from 'assets/img/copy-grey.svg';

import {Column, PrimaryBoldText, RowSpaceAround} from 'components/styled';
import IconButton from 'components/buttons/IconButton';

const Container = styled(RowSpaceAround)`
  flex-wrap: wrap;
  padding: 20px;
  height: 160px;
  border-radius: ${({theme}) => theme.main.borderRadius};
  background-color: ${({theme}) => theme.main.backgroundColors.primaryLighter};
`;
const CodeItemWrapper = styled(Column)`
  width: 140px;
  height: 24px;
`;

const IconWrapper = styled(Column)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function RecoveryCodesBlock({codes, onClickCopy}) {
  return (
    <Container>
      {codes.map((code, i) => (
        <CodeItemWrapper>
          <PrimaryBoldText key={i}>{code}</PrimaryBoldText>
        </CodeItemWrapper>
      ))}
      <IconWrapper>
        <IconButton onClick={onClickCopy} icon={<CopyIcon />} />
      </IconWrapper>
    </Container>
  );
}

RecoveryCodesBlock.propTypes = {
  codes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default RecoveryCodesBlock;
