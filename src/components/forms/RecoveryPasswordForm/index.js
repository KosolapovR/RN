import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';
import styled from 'styled-components/native';

import {email, minLength, required} from 'shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import AttentionBlock from 'components/blocks/AttentionBlock';
import {Column} from 'components/styled';

const minLength6 = minLength(6);

const StyledForm = styled.View`
  height: 180px;
`;

const StyledButtonsWrapper = styled.View`
  margin-top: 20px;
`;

const RecoveryPasswordForm = ({handleSubmit, invalid}) => (
  <Column>
    <StyledForm>
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
    </StyledForm>
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
  </Column>
);

RecoveryPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'recoveryPasswordForm',
})(RecoveryPasswordForm);
