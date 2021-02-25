import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import CodeInput from 'react-native-code-input';
import {ThemeContext} from 'styled-components';
import {Dimensions, View} from 'react-native';
import styled from 'styled-components/native';

const windowWidth = Dimensions.get('window').width;

const Label = styled.Text`
  color: ${props => props.theme.main.colors.secondary};
`;

const CodeField = ({onFinishCheckingCode, label}) => {
  const theme = useContext(ThemeContext);

  const _onFinishCheckingCode = v => {
    onFinishCheckingCode(v);
  };

  const codeCount = 6;
  const paddingRight = 20;
  const paddingLeft = 20;
  const spaceBetweenCell = 8;

  return (
    <>
      {label && <Label>{label}</Label>}
      <CodeInput
        keyboardType="numeric"
        codeLength={codeCount}
        borderType="border-circle"
        autoFocus={false}
        size={
          (windowWidth -
            paddingRight -
            paddingLeft -
            (codeCount - 1) * spaceBetweenCell) /
          codeCount
        }
        space={spaceBetweenCell}
        containerStyle={{flex: 0, marginBottom: 30}}
        codeInputStyle={{
          borderRadius: 5,
          fontWeight: '100',
          backgroundColor: theme.main.backgroundColors.primaryLighter,
        }}
        onFulfill={code => _onFinishCheckingCode(code)}
        input
      />
    </>
  );
};

CodeField.propTypes = {
  onFinishCheckingCode: PropTypes.func.isRequired,
  label: PropTypes.string,
};

CodeField.defaultProps = {
  label: null,
};

export default CodeField;
