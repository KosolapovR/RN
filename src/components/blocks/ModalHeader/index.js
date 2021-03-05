import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {PrimaryBoldText, RowSpaceBetween} from 'components/styled';
import IconButton from 'components/buttons/IconButton';
import Icon from 'react-native-vector-icons/Ionicons';
import styled, {ThemeContext} from 'styled-components/native';

const Container = styled(RowSpaceBetween)`
  padding: 15px 20px;
  height: 50px;
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-top-left-radius: ${(props) => props.theme.main.borderRadius};
  border-top-right-radius: ${(props) => props.theme.main.borderRadius};
`;

function ModalHeader({onClose, title}) {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <PrimaryBoldText>{title}</PrimaryBoldText>
      <IconButton
        onClick={onClose}
        icon={
          <Icon name="close" size={20} color={theme.main.colors.secondary} />
        }
      />
    </Container>
  );
}

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

ModalHeader.defaultProps = {
  title: '',
  onClose: null,
};

export default ModalHeader;
