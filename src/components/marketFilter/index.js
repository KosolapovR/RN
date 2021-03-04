import React, {useCallback, useContext, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import styled, {ThemeContext} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {PrimaryBoldText, RowSpaceBetween} from 'components/styled';
import BasicButton from 'components/buttons/BasicButton';
import CheckBoxField from 'components/fields/CheckBoxField';
import RangeField from 'components/fields/RangeField';
import IconButton from 'components/buttons/IconButton';

const Container = styled.ScrollView``;

const Header = styled(RowSpaceBetween)`
  padding: 15px 20px;
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

const MarketFilter = ({
  onFilter,
  onClose,
  currencyAlias,
  availableMinRate,
  availableMaxRate,
  availableMinResponseTime,
  availableMaxResponseTime,
  availableMinDealsCount,
  availableMaxDealsCount,
}) => {
  const theme = useContext(ThemeContext);

  const [lowRate, setLowRate] = useState(availableMinRate);
  const [highRate, setHighRate] = useState(availableMaxRate);
  const [lowResponseTime, setLowResponseTime] = useState(
    availableMinResponseTime,
  );
  const [highResponseTime, setHighResponseTime] = useState(
    availableMaxResponseTime,
  );
  const [lowDealsCount, setLowDealsCount] = useState(availableMinDealsCount);
  const [highDealsCount, setHighDealsCount] = useState(availableMaxDealsCount);
  const onClear = useCallback(() => {
    setLowRate(availableMinRate);
    setHighRate(availableMaxRate);
    setLowResponseTime(availableMinResponseTime);
    setHighResponseTime(availableMaxResponseTime);
    setLowDealsCount(availableMinDealsCount);
    setHighDealsCount(availableMaxDealsCount);
  }, []);

  const handleFilter = useCallback(() => {
    onFilter({
      lowRate,
      highRate,
      lowResponseTime,
      highResponseTime,
      lowDealsCount,
      highDealsCount,
    });
  }, []);

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
            <IconButton
              onClick={onClose}
              icon={
                <Icon
                  name="close"
                  size={16}
                  color={theme.main.colors.secondary}
                />
              }
            />
          </Header>
          <Body>
            <RangeField
              label={`Курс (${currencyAlias})`}
              min={+availableMinRate}
              max={+availableMaxRate}
              low={lowRate}
              high={highRate}
              setLow={useCallback((v) => setLowRate(v), [])}
              setHigh={useCallback((v) => setHighRate(v), [])}
            />
            <RangeField
              label="Время отклика (мин.)"
              min={+availableMinResponseTime}
              max={+availableMaxResponseTime}
              low={lowResponseTime}
              high={highResponseTime}
              setLow={useCallback(
                (v) => {
                  setLowResponseTime(v);
                },
                [setLowResponseTime],
              )}
              setHigh={useCallback((v) => setHighResponseTime(v), [])}
              inputFieldWidth={50}
            />
            <RangeField
              label="Сделок покупателя"
              min={availableMinDealsCount}
              max={availableMaxDealsCount}
              low={+lowDealsCount}
              high={+highDealsCount}
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
              onClick={handleFilter}
              title="Применить"
              color={'primary'}
            />
          </Body>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

MarketFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  currencyAlias: PropTypes.string.isRequired,
  availableMinRate: PropTypes.number.isRequired,
  availableMaxRate: PropTypes.number.isRequired,
  availableMinResponseTime: PropTypes.number.isRequired,
  availableMaxResponseTime: PropTypes.number.isRequired,
  availableMinDealsCount: PropTypes.number.isRequired,
  availableMaxDealsCount: PropTypes.number.isRequired,
  onlineOnly: PropTypes.bool,
};

MarketFilter.defaultProps = {
  onlineOnly: false,
};

export default MarketFilter;
