import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {Linking, Platform, Pressable, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {change, Field, reduxForm} from 'redux-form/immutable';
import {SharedElement} from 'react-navigation-shared-element';

import BasicButton from 'components/buttons/BasicButton';
import Selected2faItem from 'components/blocks/Selected2faBlock/Selected2faItem';
import {BlueText, PrimaryText} from 'components/styled';
import BasicField from 'components/fields/BasicField';
import CodeField from 'components/fields/CodeField';
import CopyIcon from 'assets/img/copy-grey.svg';
import PulsarLoader from 'components/loaders/PulsarLoader';
import {Text} from 'react-native-paper';

const StyledForm = styled.ScrollView`
  flex: 1;
`;

const Connection2faForm = ({
  handleSubmit,
  onSubmit,
  route,
  navigation,
  onSkip,
  get2faKeyIsFinish,
}) => {
  console.log('RenderForm');
  const dispatch = useDispatch();

  const {item, token} = route.params;

  const goToAuthySite = () => {
    Linking.openURL(
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/ru/app/twilio-authy/id494168017'
        : 'https://play.google.com/store/apps/details?id=com.authy.authy&hl=ru&gl=US',
    );
  };

  const onFinishCheckingCode = (code) => {
    dispatch(change('connection2faForm', 'code', code));
  };

  return (
    <StyledForm>
      <TouchableOpacity
        onPress={() => navigation.push('Select2fa', {SelectItem: item, token})}>
        <SharedElement id={`item.${item.id}`}>
          <Selected2faItem
            subtitle={item.subtitle}
            onSelect2FA={() => {}}
            icon={item.icon}
            id={item.id}
            title={item.title}
            selectedIcon={item.selectedIcon}
            isSelected
            editable
          />
        </SharedElement>
      </TouchableOpacity>

      <PrimaryText paddingBottom={15}>
        Добавьте аккаунт вручную в вашем 2FA приложении. Мы рекомендуем
        приложение{' '}
        <Pressable onPress={goToAuthySite}>
          <BlueText>Authy</BlueText>
        </Pressable>
        .
      </PrimaryText>
      {get2faKeyIsFinish ? (
        <Field
          name="key"
          component={BasicField}
          props={{
            label: 'Ключ',
            readOnly: true,
            withError: false,
            rightSymbol: <CopyIcon />,
          }}
          type="text"
        />
      ) : (
        <PulsarLoader containerStyles={{height: 90}} />
      )}

      <CodeField
        onFinishCheckingCode={onFinishCheckingCode}
        label="Введите код из своего 2FA приложения:"
      />

      <BasicButton
        color="primary"
        title="Подключить"
        onClick={handleSubmit(onSubmit)}
        containerStyles={{marginBottom: 20}}
      />
      <BasicButton title="Не подключать 2FA" onClick={onSkip} />
    </StyledForm>
  );
};

Connection2faForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'connection2faForm',
  enableReinitialize: true,
})(Connection2faForm);
