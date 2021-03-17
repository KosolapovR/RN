import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import BasicButton from 'components/buttons/BasicButton';
import {PrimaryText} from 'components/styled';
import AppIcon from 'assets/img/2fa-mobile.svg';
import AppSelectedIcon from 'assets/img/2fa-active.svg';
import TelegramIcon from 'assets/img/new-settings/telegram-grey.svg';
import TelegramSelectedIcon from 'assets/img/new-settings/telegram-active.svg';
import Selected2faBlock from 'components/blocks/Selected2faBlock';

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
    isSelected: true,
    selectedIcon: <AppSelectedIcon height={25} width={25} />,
  },
  {
    id: 2,
    title: 'Telegram',
    subtitle: 'Push-уведомления',
    icon: <TelegramIcon height={23} width={23} />,
    isSelected: false,
    selectedIcon: <TelegramSelectedIcon height={23} width={23} />,
  },
];

const Connection2faForm = ({onSubmit, onSkip}) => {
  const [selected2FA, setSelected2FA] = useState();

  const onSelect = (id) => {
    setSelected2FA(id);
    items.forEach((item) => {
      item.isSelected = item.id === id;
    });
  };

  const onContinue = useCallback(() => onSubmit(selected2FA), [selected2FA]);

  return (
    <StyledForm>
      <PrimaryText paddingBottom={20}>
        Выберите способ подключения двухфакторной аутентификации:
      </PrimaryText>
      <Selected2faBlock onSelect2FA={onSelect} items={items} />
      <StyledButtonsWrapper>
        <BasicButton color="primary" title="Продолжить" onClick={onContinue} />
        <BasicButton title="Не подключать 2FA" onClick={onSkip} />
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

Connection2faForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onSkip: PropTypes.func.isRequired,
};

export default Connection2faForm;
