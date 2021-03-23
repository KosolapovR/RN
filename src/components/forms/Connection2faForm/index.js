import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {Linking, Platform, Pressable} from 'react-native';

import BasicButton from 'components/buttons/BasicButton';
import Selected2faItem from 'components/blocks/Selected2faBlock/Selected2faItem';
import {BlueText, PrimaryText} from 'components/styled';
import BasicField from 'components/fields/BasicField';
import CodeField from 'components/fields/CodeField';
import CopyIcon from 'assets/img/copy-grey.svg';
import PulsarLoader from 'components/loaders/PulsarLoader';
import IconButton from 'components/buttons/IconButton';
import {useFormik} from 'formik';
import AppIcon from 'assets/img/2fa-mobile.svg';
import AppSelectedIcon from 'assets/img/2fa-active.svg';
import TelegramIcon from 'assets/img/new-settings/telegram-grey.svg';
import TelegramSelectedIcon from 'assets/img/new-settings/telegram-active.svg';

const StyledForm = styled.ScrollView`
  flex: 1;
`;

const items = [
  {
    id: 1,
    title: '2FA App',
    subtitle: 'Authy/Google Authenticator',
    icon: <AppIcon height={25} width={25} />,
    isSelected: false,
    selectedIcon: <AppSelectedIcon height={25} width={25} />,
    isAvailable: true,
  },
  {
    id: 2,
    title: 'Telegram',
    subtitle: 'Push-уведомления',
    icon: <TelegramIcon height={23} width={23} />,
    isSelected: false,
    selectedIcon: <TelegramSelectedIcon height={23} width={23} />,
    isAvailable: false,
  },
];

const Connection2faForm = ({
  onSubmit,
  selectedItemID,
  onSkip,
  get2faKeyIsFinish,
  onCopyKey,
  initialValues: {key},
}) => {
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      key: '',
    },
    onSubmit: (formValues) => {
      onSubmit(formValues);
    },
  });

  useEffect(() => {
    setFieldValue('key', key);
  }, [key]);

  const goToAuthySite = () => {
    Linking.openURL(
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/ru/app/twilio-authy/id494168017'
        : 'https://play.google.com/store/apps/details?id=com.authy.authy&hl=ru&gl=US',
    );
  };

  const onFinishCheckingCode = (passcode) => {
    setFieldValue('passcode', passcode);
  };

  return (
    <StyledForm>
      <Selected2faItem
        subtitle={items[selectedItemID - 1].subtitle}
        onSelect2FA={() => {}}
        icon={items[selectedItemID - 1].icon}
        id={items[selectedItemID - 1].id}
        title={items[selectedItemID - 1].title}
        selectedIcon={items[selectedItemID - 1].selectedIcon}
        isSelected
        editable
      />

      <PrimaryText paddingBottom={15}>
        Добавьте аккаунт вручную в вашем 2FA приложении. Мы рекомендуем
        приложение{' '}
        <Pressable onPress={goToAuthySite}>
          <BlueText style={{top: 3}}>Authy</BlueText>
        </Pressable>
        .
      </PrimaryText>
      {get2faKeyIsFinish ? (
        <BasicField
          onChangeText={handleChange('key')}
          onBlur={handleBlur('key')}
          error={errors.key}
          touched={touched.key}
          value={values.key}
          label={'Ключ:'}
          readOnly={true}
          withError={false}
          rightSymbol={<IconButton onClick={onCopyKey} icon={<CopyIcon />} />}
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
        onClick={handleSubmit}
        containerStyles={{marginBottom: 20}}
      />
      <BasicButton title="Не подключать 2FA" onClick={onSkip} />
    </StyledForm>
  );
};

Connection2faForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Connection2faForm;
