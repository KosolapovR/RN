import React, {useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {PrimaryBoldText, RowSpaceBetween} from '../styled';
import BasicButton from '../buttons/BasicButton';
import CheckBoxField from '../fields/CheckBoxField';
import RangeField from '../fields/RangeField';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

const Container = styled.ScrollView`
  border-style: solid;
  border-width: 1px;
  border-radius: ${(props) => props.theme.main.borderRadius};
`;

const Header = styled(RowSpaceBetween)`
  padding: 20px;
  height: 50px;
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  border-top-left-radius: ${(props) => props.theme.main.borderRadius};
  border-top-right-radius: ${(props) => props.theme.main.borderRadius};
`;

const Body = styled.View`
  padding: 20px;
  background-color: ${(props) => props.theme.main.backgroundColors.primary};
  border-bottom-left-radius: ${(props) => props.theme.main.borderRadius};
  border-bottom-right-radius: ${(props) => props.theme.main.borderRadius};
`;

const MarketFilter = ({onFilter}) => {
  const [lowRate, setLowRate] = useState(420000);
  const [highRate, setHighRate] = useState(490000);
  const [lowResponseTime, setLowResponseTime] = useState(1);
  const [highResponseTime, setHighResponseTime] = useState(60);
  const [lowDealsCount, setLowDealsCount] = useState(0);
  const [highDealsCount, setHighDealsCount] = useState(100);
  const onClear = () => {
    setLowRate(420000);
    setHighRate(490000);
    setLowResponseTime(1);
    setHighResponseTime(60);
    setLowDealsCount(0);
    setHighDealsCount(100);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{backgroundColor: 'white'}}>
        <Container>
          <Header>
            <PrimaryBoldText>Фильтры</PrimaryBoldText>
            <PrimaryBoldText>Х</PrimaryBoldText>
          </Header>
          <Body>
            <RangeField
              label="Курс (ETH)"
              min={420000}
              max={480000}
              low={lowRate}
              high={highRate}
              setLow={useCallback((v) => setLowRate(v), [])}
              setHigh={useCallback((v) => setHighRate(v), [])}
            />
            <RangeField
              label="Время отклика (мин.)"
              min={1}
              max={60}
              low={lowResponseTime}
              high={highResponseTime}
              setLow={useCallback((v) => setLowResponseTime(v), [])}
              setHigh={useCallback((v) => setHighResponseTime(v), [])}
              inputFieldWidth={50}
            />
            <RangeField
              label="Сделок покупателя"
              min={0}
              max={100}
              low={lowDealsCount}
              high={highDealsCount}
              setLow={useCallback((v) => setLowDealsCount(v), [])}
              setHigh={useCallback((v) => setHighDealsCount(v), [])}
              inputFieldWidth={50}
            />
            <CheckBoxField input={{}} label="Только онлайн" />
            <BasicButton
              onClick={onClear}
              title="Очистить"
              color={'secondary'}
              containerStyles={{marginBottom: 15, marginTop: 20}}
            />
            <BasicButton
              onClick={onFilter}
              title="Применить"
              color={'primary'}
            />
          </Body>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

MarketFilter.propTypes = {};

export default MarketFilter;
