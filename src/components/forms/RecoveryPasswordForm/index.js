import React from 'react';
import PropTypes from 'prop-types';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Field, reduxForm} from 'redux-form/immutable';
import styled from 'styled-components/native';

import {email, minLength, required} from '@cashelec/shared/validators';

import BasicField from 'components/fields/BasicField';
import BasicButton from 'components/buttons/BasicButton';
import AttentionBlock from 'components/blocks/AttentionBlock';
import {Column} from 'components/styled';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const minLength6 = minLength(6);

const StyledForm = styled.View`
  height: 180px;
`;

const StyledButtonsWrapper = styled.View`
  margin-top: 20px;
`;

const RecoveryPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректый email')
    .min(6, 'Не менне 6 символов!')
    .max(30, 'Не более 30 символов')
    .required('Обязательное поле'),
});

const RecoveryPasswordForm = ({onSubmit}) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik({
    validationSchema: RecoveryPasswordSchema,
    initialValues: {email: ''},
    onSubmit: (formValues) => onSubmit(formValues),
  });
  return (
    <Column>
      <StyledForm>
        <AttentionBlock
          text="Если вы указали в настройках контрольные вопросы для восстановления, то
        вы сможете восстановить пароль без доступа к почте."
          paddingBottom={20}
        />
        <BasicField
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
          touched={touched.email}
          value={values.email}
          label={'Введите почту указанную при регистрации:'}
        />
      </StyledForm>
      <StyledButtonsWrapper>
        <BasicButton
          color="primary"
          title="Выслать инструкцию"
          onClick={handleSubmit}
          isDisabled={!isValid || !dirty}
        />
      </StyledButtonsWrapper>
    </Column>
  );
};

RecoveryPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RecoveryPasswordForm;
