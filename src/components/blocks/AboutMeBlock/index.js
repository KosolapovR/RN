import React from 'react';

import PropTypes from 'prop-types';
import {Column, PrimaryText, SecondaryBoldText} from 'components/styled';
import styled from 'styled-components/native';
import Divider from 'components/Divider';

const Container = styled(Column)`
  position: relative;
  padding-bottom: 20px;
`;

function AboutMeBlock({text}) {
  return (
    <Container>
      <SecondaryBoldText>О себе</SecondaryBoldText>
      <PrimaryText>{text}</PrimaryText>
      <Divider />
    </Container>
  );
}

AboutMeBlock.propTypes = {
  userName: PropTypes.string.isRequired,
  dealsCount: PropTypes.number,
  commentsCount: PropTypes.number,
  rating: PropTypes.number,
};

AboutMeBlock.defaultProps = {
  dealsCount: 0,
  commentsCount: 0,
  rating: 0,
};

export default AboutMeBlock;
