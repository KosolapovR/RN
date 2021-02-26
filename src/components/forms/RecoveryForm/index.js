import React from 'react';
import PropTypes from 'prop-types';

import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';

import {email, minLength, required} from 'shared/validators';

import BasicField from '../../fields/BasicField';
import BasicButton from '../../buttons/BasicButton';
import styled from 'styled-components/native';
import AttentionBlock from '../../blocks/AttentionBlock';

const minLength6 = minLength(6);

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  justify-content: space-between;
  height: 100px;
`;

const RecoveryForm = ({handleSubmit, invalid}) => (
  <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={{backgroundColor: 'white'}}>
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
      </StyledForm>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

RecoveryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'recoveryForm',
})(RecoveryForm);
