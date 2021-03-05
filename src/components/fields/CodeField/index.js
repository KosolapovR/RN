import React, {useContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import CodeInput from 'react-native-code-input';
import {ThemeContext} from 'styled-components';
import {Dimensions, View} from 'react-native';
import {SecondaryText} from '../../styled';

const windowWidth = Dimensions.get('window').width;

const CodeField = ({onFinishCheckingCode, label, codeCount}) => {
  const theme = useContext(ThemeContext);

  const _onFinishCheckingCode = (v) => {
    onFinishCheckingCode(v);
  };

  const paddingRight = 20;
  const paddingLeft = 20;
  const spaceBetweenCell = 15;
  const size = useMemo(() => {
    const calculated =
      (windowWidth -
        paddingRight -
        paddingLeft -
        (codeCount - 1) * spaceBetweenCell) /
      codeCount;
    console.log(calculated);
    const max = 60;

    return Math.min([calculated, max]);
  }, [windowWidth, codeCount]);
  return (
    <>
      {label && <SecondaryText>{label}</SecondaryText>}
      <CodeInput
        keyboardType="numeric"
        codeLength={codeCount}
        borderType="border-circle"
        autoFocus={false}
        size={size ? size : 50}
        space={spaceBetweenCell}
        containerStyle={{flex: 0, marginBottom: 30}}
        codeInputStyle={{
          borderRadius: 5,
          fontWeight: '100',
          backgroundColor: theme.main.backgroundColors.primaryLighter,
        }}
        onFulfill={(code) => _onFinishCheckingCode(code)}
        input
      />
    </>
  );
};

CodeField.propTypes = {
  onFinishCheckingCode: PropTypes.func.isRequired,
  label: PropTypes.string,
  codeCount: PropTypes.number,
};

CodeField.defaultProps = {
  label: null,
  codeCount: 6,
};

export default CodeField;
