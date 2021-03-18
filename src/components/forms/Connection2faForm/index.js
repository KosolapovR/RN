import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import BasicButton from 'components/buttons/BasicButton';
import {useTheme} from 'styled-components';
import Selected2faItem from 'components/blocks/Selected2faBlock/Selected2faItem';
import EditIcon from 'assets/img/edit-mobile.svg';
import {SharedElement} from 'react-navigation-shared-element';
import {TouchableOpacity} from 'react-native';
import AppIcon from 'assets/img/2fa-mobile.svg';
import AppSelectedIcon from 'assets/img/2fa-active.svg';
import TelegramIcon from 'assets/img/new-settings/telegram-grey.svg';
import TelegramSelectedIcon from 'assets/img/new-settings/telegram-active.svg';

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  margin-top: 25px;
`;

const Connection2faForm = ({onSubmit, selected2faItem, route, navigation}) => {
  const [is2fa, set2FA] = useState(true);

  const onContinue = useCallback(() => {
    onSubmit(is2fa);
  }, [is2fa]);

  const {item, token} = route.params;

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

      <StyledButtonsWrapper>
        <BasicButton color="primary" title="Подключить" onClick={onContinue} />
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

Connection2faForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Connection2faForm;
