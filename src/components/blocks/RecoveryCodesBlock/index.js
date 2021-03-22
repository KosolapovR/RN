import React from 'react';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import CopyIcon from 'assets/img/copy-grey.svg';

import {Column, PrimaryBoldText, RowSpaceAround} from 'components/styled';
import IconButton from 'components/buttons/IconButton';
import PulsarLoader from 'components/loaders/PulsarLoader';

const windowWidth = Dimensions.get('window').width;

const Container = styled(RowSpaceAround)`
  flex-wrap: wrap;
  padding: 20px;
  height: 160px;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme}) => theme.main.borderRadius};
  background-color: ${({theme}) => theme.main.backgroundColors.primaryLighter};
`;
const CodeItemWrapper = styled(Column)`
  width: ${({smallWidth}) => (smallWidth ? '100px' : '140px')};
  height: 24px;
`;

const IconWrapper = styled(Column)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

function RecoveryCodesBlock({codes, onClickCopy, isFetching}) {
  if (isFetching) {
    return <PulsarLoader />;
  }

  return (
    <Container>
      {codes.map((code, i) => (
        <CodeItemWrapper smallWidth={windowWidth < 375}>
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
  isFetching: PropTypes.bool,
  onClickCopy: PropTypes.func.isRequired,
};

RecoveryCodesBlock.defaultProps = {
  isFetching: true,
};

export default RecoveryCodesBlock;
