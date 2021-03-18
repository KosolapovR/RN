import * as React from 'react';
import styled from 'styled-components/native';
import Connection2faForm from 'components/forms/Connection2faForm';
import AppIcon from 'assets/img/2fa-mobile.svg';
import AppSelectedIcon from 'assets/img/2fa-active.svg';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connection2faScreen = ({navigation, route}) => {
  const handleSubmitForm = () => {};

  return (
    <Wrapper>
      <Connection2faForm
        route={route}
        navigation={navigation}
        onSubmit={handleSubmitForm}
      />
    </Wrapper>
  );
};

export default Connection2faScreen;
