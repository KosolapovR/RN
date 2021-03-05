import React from 'react';
import PropTypes from 'prop-types';
import {Column, ModalBody, Row, SecondaryText} from 'components/styled';
import styled from 'styled-components/native';
import ModalHeader from 'components/blocks/ModalHeader';
import AttentionBlock from 'components/blocks/AttentionBlock';
import CodeField from 'components/fields/CodeField';
import BasicButton from 'components/buttons/BasicButton';

function ConfirmPinModal({onClose, onConfirm}) {
  return (
    <Column>
      <ModalHeader title="Введите PIN-код" onClose={onClose} />
      <ModalBody>
        <AttentionBlock text="Введите PIN-код, заданный в Настройках, чтобы подтвердить действие:" />
        <CodeField codeCount={4} onFinishCheckingCode={() => {}} />
        <BasicButton onClick={onConfirm} title="Подтвердить" color="primary" />
      </ModalBody>
    </Column>
  );
}

ConfirmPinModal.propTypes = {};

export default ConfirmPinModal;
