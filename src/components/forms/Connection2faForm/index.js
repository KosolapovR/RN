import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';

import BasicButton from 'components/buttons/BasicButton';
import {PrimaryBoldLargeText} from 'components/styled';
import RadioButtonRN from 'radio-buttons-react-native';
import {useTheme} from 'styled-components';

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  margin-top: 25px;
`;

const Connect2faForm = ({onSubmit}) => {
  const theme = useTheme();

  const [is2fa, set2FA] = useState(true);

  const onContinue = useCallback(() => {
    onSubmit(is2fa);
  }, [is2fa]);

  return (
    <StyledForm>
      <PrimaryBoldLargeText paddingBottom={15}>
        Подключение 2FA
      </PrimaryBoldLargeText>
      <RadioButtonRN
        initial={1}
        boxStyle={{
          height: 45,
          padding: 0,
          backgroundColor: theme.main.backgroundColors.primary,
          borderWidth: 0,
        }}
        activeColor={theme.main.colors.blue}
        deactiveColor={theme.main.colors.primary}
        animationTypes={['shake']}
        textColor={theme.main.colors.primary}
        data={[
          {
            label: 'Я хочу подключить 2FA сейчас',
            value: true,
          },
          {
            label: 'Пропустить и подключить позже',
            value: false,
          },
        ]}
        selectedBtn={(e) => {
          set2FA(e.value);
        }}
      />
      <StyledButtonsWrapper>
        <BasicButton color="primary" title="Продолжить" onClick={onContinue} />
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

Connect2faForm.propTypes = {};

export default Connect2faForm;
