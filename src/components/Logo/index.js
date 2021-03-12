import React from 'react';
import Logo from 'assets/img/logo/empo-logo-white.svg';
import styled from 'styled-components/native/dist/styled-components.native.esm';

const TitleWrapper = styled.View`
  margin-left: 20px;
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const LogoTitle = () => {
  return (
    <TitleWrapper>
      <Logo width={140} />
    </TitleWrapper>
  );
};

export default LogoTitle;
