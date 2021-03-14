import * as React from 'react';
import {useCallback} from 'react';
import styled from 'styled-components/native';
import ResetPasswordForm from 'components/forms/ResetPasswordForm';
import FormWrapper from 'components/forms/FormWrapper';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const ResetPasswordScreen = () => {
  const onSubmit = useCallback((formValues) => {
    console.log('formValues', formValues);

    // dispatch(
    //   mutateAsync(
    //     postLogin({
    //       requestBody: formValues,
    //       successCallback: ({body, ...rest}) => {
    //         console.log('body', body);
    //         console.log('rest', rest);
    //       },
    //     }),
    //   ),
    // );
  }, []);

  return (
    <Wrapper>
      <FormWrapper>
        <ResetPasswordForm onSubmit={onSubmit} />
      </FormWrapper>
    </Wrapper>
  );
};

export default ResetPasswordScreen;
