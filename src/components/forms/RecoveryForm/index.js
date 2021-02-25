import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';

import {
  minLength,
  required,
  maxLength,
  password,
  email,
} from 'shared/validators';

import BasicField from '../../fields/BasicField';
import BasicButton from '../../buttons/BasicButton';
import styled from 'styled-components/native';
import AttentionBlock from '../../blocks/AttentionBlock';

const minLength6 = minLength(6);

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const RecoveryForm = ({handleSubmit, invalid}) => (
  <View>
    <AttentionBlock
      text="Если вы указали в настройках контрольные вопросы для восстановления, то
        вы сможете восстановить пароль без доступа к почте."
      paddingBottom={20}
    />
    <Field
      name="email"
      component={BasicField}
      props={{
        label: 'Введите почту указанную при регистрации:',
      }}
      validate={[required, minLength6, email]}
      type="text"
    />
    <StyledButtonsWrapper>
      <BasicButton
        color="primary"
        title="Выслать инструкцию"
        onClick={() => {
          handleSubmit();
        }}
        isDisabled={invalid}
      />
    </StyledButtonsWrapper>
  </View>
);

RecoveryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'recoveryForm',
})(RecoveryForm);
