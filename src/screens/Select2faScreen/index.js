import * as React from 'react';
import {useContext} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from 'context/AuthContext';
import Select2faForm from 'components/forms/Select2faForm';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Select2faScreen = ({navigation, route}) => {
  const {signIn} = useContext(AuthContext);

  const handleSubmitForm = (id2FA) => {
    navigation.navigate('Connection2fa', {id2FA});
  };

  const onSkip = () => {
    const {token} = route.params;
    signIn(token);
  };

  return (
    <Wrapper>
      <Select2faForm
        onSubmit={handleSubmitForm}
        onSkip={onSkip}
        navigation={navigation}
        route={route}
      />
    </Wrapper>
  );
};

export default Select2faScreen;
