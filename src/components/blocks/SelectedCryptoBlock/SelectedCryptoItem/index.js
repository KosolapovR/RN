import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  PrimaryBoldText,
  Row,
  RowSpaceBetween,
  SecondaryBoldText,
} from 'components/styled';
import {Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Container = styled.TouchableOpacity`
  height: 40px;
  width: 48%;
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
  margin-right: 10px;
`;

const SelectedIconWrapper = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.main.backgroundColors.blue};
`;

function SelectedCryptoItem({currency, currencyIcon}) {
  const [selected, setSelected] = useState(false);
  return (
    <Container
      selected={selected}
      onPress={() => {
        setSelected(!selected);
      }}>
      <RowSpaceBetween>
        <Row>
          <IconWrapper>
            <Image
              source={{
                uri: currencyIcon,
              }}
              style={{
                width: 25,
                height: 25,
                borderRadius: 5,
              }}
            />
          </IconWrapper>
          <PrimaryBoldText>{currency}</PrimaryBoldText>
        </Row>
      </RowSpaceBetween>
      {selected && (
        <SelectedIconWrapper>
          <FontAwesome5 name="check" size={10} color={'#ffffff'} />
        </SelectedIconWrapper>
      )}
    </Container>
  );
}

SelectedCryptoItem.propTypes = {
  currency: PropTypes.string.isRequired,
  currencyIcon: PropTypes.string.isRequired,
};

export default SelectedCryptoItem;
