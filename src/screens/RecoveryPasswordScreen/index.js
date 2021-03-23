// @flow
import * as React from 'react';
import {useCallback} from 'react';
import styled from 'styled-components/native';
import RecoveryPasswordForm from 'components/forms/RecoveryPasswordForm';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from '../../hooks/api/useAuthApi';

const Wrapper = (styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`: React.ComponentType<{}>);

const RecoveryPasswordScreen = ({navigation}: {navigation: Function}) => {
  const {getPasswordRecovery} = useAuthApi();

  const onSubmit = useCallback(
    (formValues) => {
      const email = formValues.email;

      getPasswordRecovery({
        requestBody: {email: encodeURIComponent(email)},
        successCallback: () => {
          navigation.navigate('RecoverySuccess', {
            mailService: email.split('@')[1],
          });
        },
      });
    },

    [],
  );
  return (
    <Wrapper>
      <FormWrapper>
        <RecoveryPasswordForm onSubmit={onSubmit} />
      </FormWrapper>
    </Wrapper>
  );
};

export default RecoveryPasswordScreen;
