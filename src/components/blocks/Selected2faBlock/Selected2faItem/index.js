import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  Column,
  PrimaryText,
  Row,
  RowSpaceBetween,
  SecondaryTextSmall,
} from 'components/styled';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Container = styled.TouchableOpacity`
  height: 68px;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  margin-bottom: 15px;
  border-radius: ${(props) => props.theme.main.borderRadius};
  border-style: solid;
  border-width: 1px;
  border-color: ${(props) =>
    props.selected
      ? props.theme.main.backgroundColors.blue
      : props.theme.main.backgroundColors.primaryLighterHover};
`;

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  margin-left: 15px;
`;

const SelectedIconWrapper = styled.View`
  position: absolute;
  top: 24px;
  right: 15px;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.main.backgroundColors.blue};
`;

function Selected2faItem({
  id,
  title,
  subtitle,
  icon,
  isSelected,
  selectedIcon,
  onSelect2FA,
}) {

  return (
    <Container
      selected={isSelected}
      onPress={() => {
        onSelect2FA(id);
      }}>
      <RowSpaceBetween>
        <Row>
          <IconWrapper>{isSelected ? selectedIcon : icon}</IconWrapper>
          <Column>
            <PrimaryText>{title}</PrimaryText>
            <SecondaryTextSmall>{subtitle}</SecondaryTextSmall>
          </Column>
        </Row>
      </RowSpaceBetween>
      {isSelected && (
        <SelectedIconWrapper>
          <FontAwesome5 name="check" size={10} color={'#ffffff'} />
        </SelectedIconWrapper>
      )}
    </Container>
  );
}

Selected2faItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  selectedIcon: PropTypes.string.isRequired,
  onSelect2FA: PropTypes.func.isRequired,
};

export default Selected2faItem;
