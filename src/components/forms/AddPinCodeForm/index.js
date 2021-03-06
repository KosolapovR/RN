import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native';

import {
  minLength,
  required,
  maxLength,
  password,
} from '@cashelec/shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import CodeField from 'components/fields/CodeField';

const minLength6 = minLength(6);
const maxLength30 = maxLength(30);

const StyledForm = styled.View`
  flex: 1;
`;
const StyledButtonsWrapper = styled.View``;

const AddPinCodeForm = ({handleSubmit, invalid}) => (
  <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/*<StyledForm>*/}
      {/*  <CodeField*/}
      {/*    codeCount={4}*/}
      {/*    onFinishCheckingCode={() => {}}*/}
      {/*    label="Введите PIN-код:"*/}
      {/*  />*/}
      {/*  <CodeField*/}
      {/*    codeCount={4}*/}
      {/*    onFinishCheckingCode={() => {}}*/}
      {/*    label="Повторите PIN-код:"*/}
      {/*  />*/}
      {/*  <Field*/}
      {/*    name="password"*/}
      {/*    component={BasicField}*/}
      {/*    props={{*/}
      {/*      label: 'Текущий пароль:',*/}
      {/*      isSecurity: true,*/}
      {/*    }}*/}
      {/*    validate={[required, minLength6, maxLength30, password]}*/}
      {/*    type="text"*/}
      {/*  />*/}
      {/*  <StyledButtonsWrapper>*/}
      {/*    <BasicButton*/}
      {/*      color="primary"*/}
      {/*      title="Сохранить"*/}
      {/*      onClick={() => {*/}
      {/*        handleSubmit();*/}
      {/*      }}*/}
      {/*      isDisabled={invalid}*/}
      {/*    />*/}
      {/*  </StyledButtonsWrapper>*/}
      {/*</StyledForm>*/}
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

AddPinCodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onRecoveryPassword: PropTypes.func.isRequired,
};

export default AddPinCodeForm;
