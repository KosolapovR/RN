import * as React from 'react';
import {useContext} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from 'context/AuthContext';
import Connection2faForm from 'components/forms/Connection2faForm';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Connection2faScreen = ({route}) => {
  const {signIn} = useContext(AuthContext);

  const handleSubmitForm = () => {};

  const onSkip = () => {
    const {token} = route.params;
    signIn(token);
  };

  return (
    <Wrapper>
      <Connection2faForm onSubmit={handleSubmitForm} onSkip={onSkip} />
    </Wrapper>
  );
};

export default Connection2faScreen;
