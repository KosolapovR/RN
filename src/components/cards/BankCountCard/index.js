import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View} from 'react-native';
import SendIcon from '../../../assets/img/arrows/send-arrow-white.svg';
import ReceiveIcon from '../../../assets/img/arrows/receive-arrow-white.svg';
import IconButton from '../../buttons/IconButton';

const Container = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-radius: ${(props) => props.theme.main.borderRadius};
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledIcon = styled.Image`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`;

const WhiteText = styled.Text`
  color: #ffffff;
  font-weight: bold;
`;
const PrimaryText = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const RightContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const BankCountCard = ({icon, bankName, additionalInfo, onClick, currency}) => {
  return (
    <Container onPress={onClick}>
      <LeftContainer>
        <StyledIcon
          source={{
            uri: icon,
          }}
        />
        <View>
          <WhiteText>{bankName}</WhiteText>
          <PrimaryText>{additionalInfo}</PrimaryText>
        </View>
      </LeftContainer>
      <RightContainer>
        <PrimaryText>{currency}</PrimaryText>
      </RightContainer>
    </Container>
  );
};

BankCountCard.propTypes = {
  icon: PropTypes.string.isRequired,
  bankName: PropTypes.string.isRequired,
  additionalInfo: PropTypes.string,
  onClick: PropTypes.func,
};

BankCountCard.defaultProps = {
  additionalInfo: '',
  onClick: () => {},
};

export default BankCountCard;
