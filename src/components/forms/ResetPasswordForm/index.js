import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import {Column} from 'components/styled';

const StyledForm = styled.View`
  height: 180px;
`;
const StyledButtonsWrapper = styled.View`
  margin-top: 10px;
  align-self: flex-start;
  justify-content: flex-start;
`;

const ResetPasswordForm = ({handleSubmit, invalid}) => (
  <Column>
    <StyledForm>
      {/*<Field*/}
      {/*  name="password"*/}
      {/*  component={BasicField}*/}
      {/*  props={{*/}
      {/*    label: 'Введите пароль:',*/}
      {/*    isSecurity: true,*/}
      {/*  }}*/}
      {/*  validate={[required, minLength6, maxLength30, password]}*/}
      {/*  type="text"*/}
      {/*/>*/}
      {/*<Field*/}
      {/*  name="repeatPassword"*/}
      {/*  component={BasicField}*/}
      {/*  props={{*/}
      {/*    label: 'Повторите пароль:',*/}
      {/*    isSecurity: true,*/}
      {/*  }}*/}
      {/*  validate={[required, minLength6, maxLength30, password]}*/}
      {/*  type="text"*/}
      {/*/>*/}
    </StyledForm>
    <StyledButtonsWrapper>
      <BasicButton
        containerStyles={{flex: 0}}
        color="primary"
        title="Продолжить"
        onClick={() => {
          handleSubmit();
        }}
        isDisabled={invalid}
      />
    </StyledButtonsWrapper>
  </Column>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default ResetPasswordForm;
