import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

import BasicButton from 'components/buttons/BasicButton';
import {Column, PrimaryText} from 'components/styled';
import AppIcon from 'assets/img/2fa-mobile.svg';
import AppSelectedIcon from 'assets/img/2fa-active.svg';
import TelegramIcon from 'assets/img/new-settings/telegram-grey.svg';
import TelegramSelectedIcon from 'assets/img/new-settings/telegram-active.svg';
import {SharedElement} from 'react-navigation-shared-element';
import Selected2faItem from 'components/blocks/Selected2faBlock/Selected2faItem';

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  margin-top: 20px;
  height: 100px;
  justify-content: space-between;
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

const Select2faForm = ({onSkip, onSubmit}) => {
  const [selectedItemID, setSelectedItemID] = useState();

  const handleContinue = useCallback(() => {
    onSubmit(selectedItemID);
  }, [selectedItemID]);

  function renderItem(item) {
    return item.isAvailable ? (
      <TouchableOpacity
        onPress={() => {
          setSelectedItemID(item.id);
        }}>
        <Selected2faItem
          icon={item.icon}
          title={item.title}
          id={item.id}
          isSelected={item.id === selectedItemID}
          selectedIcon={item.selectedIcon}
          subtitle={item.subtitle}
          isAvailable={item.isAvailable}
        />
      </TouchableOpacity>
    ) : (
      <Column>
        <Selected2faItem
          icon={item.icon}
          title={item.title}
          id={item.id}
          isSelected={item.id === selectedItemID}
          selectedIcon={item.selectedIcon}
          subtitle={item.subtitle}
          isAvailable={item.isAvailable}
        />
      </Column>
    );
  }

  return (
    <StyledForm>
      <PrimaryText paddingBottom={20}>
        Выберите способ подключения двухфакторной аутентификации:
      </PrimaryText>
      {items.map((item) => renderItem(item))}
      <StyledButtonsWrapper>
        <BasicButton
          title="Продолжить"
          onClick={handleContinue}
          color="primary"
          isDisabled={!selectedItemID}
        />
        <BasicButton title="Не подключать 2FA" onClick={onSkip} />
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

Select2faForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default Select2faForm;
