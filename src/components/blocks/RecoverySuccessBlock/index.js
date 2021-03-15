import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import SuccessIconBlock from 'components/blocks/RecoverySuccessBlock/SuccessIconBlock';
import {
  Column,
  PrimaryBoldLargeCenteredText,
  SecondaryCenteredText,
} from 'components/styled';
import BasicButton from 'components/buttons/BasicButton';

const Container = styled.View`
  padding-bottom: 20px;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  flex: 1;
`;

function RecoverySuccessBlock({goToSignIn, openMailURL, mailService}) {
  return (
    <Container>
      <SuccessIconBlock />
      <Column>
        <PrimaryBoldLargeCenteredText>
          Инструкция по восстановлению пароля успешно выслана на вашу почту
        </PrimaryBoldLargeCenteredText>
        <SecondaryCenteredText paddingTop={15}>
          На указанный Вами e-mail отправлено письмо с запросом подтверждения
          смены пароля.
        </SecondaryCenteredText>
        <BasicButton
          onClick={openMailURL}
          title={`Открыть почту @${mailService}`}
          containerStyles={{flex: 0, marginTop: 15}}
          color="primary"
        />
        <BasicButton
          onClick={goToSignIn}
          title="Войти"
          containerStyles={{flex: 0, marginTop: 15}}
          color="secondary"
        />
      </Column>
    </Container>
  );
}

RecoverySuccessBlock.propTypes = {
  goToSignIn: PropTypes.func.isRequired,
  openMailURL: PropTypes.func.isRequired,
  mailService: PropTypes.string.isRequired,
};

export default RecoverySuccessBlock;
