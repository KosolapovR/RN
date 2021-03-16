import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components/native';
import {reduxForm} from 'redux-form/immutable';

import BasicButton from 'components/buttons/BasicButton';
import CodeField from 'components/fields/CodeField';
import {
  PrimaryBoldLargeText,
  SecondaryBoldTextLightLarge,
} from 'components/styled';
import RadioButtonRN from 'radio-buttons-react-native';
import {useTheme} from 'styled-components';

const StyledForm = styled.View`
  flex: 1;
`;

const StyledButtonsWrapper = styled.View`
  margin-top: 25px;
`;

const Connect2faForm = ({onSubmit}) => {
  const [setup2FA, setSetup2FA] = useState(true);
  const theme = useTheme();
  return (
    <StyledForm>
      <PrimaryBoldLargeText paddingBottom={15}>
        Подключение 2FA{' '}
      </PrimaryBoldLargeText>
      <RadioButtonRN
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
        selectedBtn={(e) => setSetup2FA(e.value)}
      />
      <StyledButtonsWrapper>
        <BasicButton
          color="primary"
          title="Продолжить"
          onClick={() => {
            onSubmit(setup2FA);
          }}
        />
      </StyledButtonsWrapper>
    </StyledForm>
  );
};

Connect2faForm.propTypes = {};

export default Connect2faForm;
