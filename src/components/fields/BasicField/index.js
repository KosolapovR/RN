import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from 'styled-components';

const StyledInputWrapper = styled.View`
  padding-bottom: 25px;
  padding-top: 25px;
  position: relative;
`;

const StyledLabel = styled.Text`
  color: ${(props) => props.theme.main.colors.secondary};
  position: absolute;
  left: 0;
  z-index: 1;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  color: ${({invalid, theme}) =>
    invalid ? theme.main.colors.error : theme.main.colors.secondary};
`;

const StyledLeftSymbolWrapper = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 36px;
  z-index: 1;
`;
const StyledRightSymbolWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 25px;
  z-index: 1;
  height: 40px;
  justify-content: center;
`;

const StyledField = styled.TextInput`
  background-color: ${({theme, isActive}) =>
    isActive
      ? theme.main.backgroundColors.primaryLighter2
      : theme.main.backgroundColors.primaryLighter};
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: ${(props) => props.theme.main.borderRadius};
  color: ${(props) => props.theme.main.colors.primary};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${(props) => (props.leftSymbol ? '45px' : '10px')};
  padding-right: ${(props) => (props.rightSymbol ? '45px' : '10px')};
  font-size: ${(props) => props.theme.main.fontSize.medium};
  border-color: ${({theme}) => theme.main.colors.error};
  border-style: solid;
  border-width: ${({invalid}) => (invalid ? '1px' : '0px')};
`;

const StyledErrorText = styled.Text`
  color: ${({theme}) => theme.main.colors.error};
  position: absolute;
  left: 0;
  bottom: 5px;
  font-size: ${(props) => props.theme.main.fontSize.small};
`;

const StyledAdditionalInfoText = styled.Text`
  color: ${(props) => props.theme.main.colors.primary};
  position: absolute;
  right: 0;
  bottom: 5px;
  font-size: ${(props) => props.theme.main.fontSize.small};
`;

const BasicField = ({
  isDisabled,
  placeholder,
  label,
  withError,
  isSecurity,
  readOnly,
  additionalInfo,
  leftSymbol,
  rightSymbol,
  onClickLeftSymbol,
  onClickRightSymbol,
  containerStyle,
  fieldStyle,
  isCheck,
  error,
  touched,
  ...rest
}) => {
  const [isActive, setActive] = useState(false);

  return (
    <StyledInputWrapper style={containerStyle}>
      {Boolean(label) && (
        <StyledLabel
          isDisabled={isDisabled}
          invalid={touched && withError && error}>
          {label}
        </StyledLabel>
      )}
      <StyledLeftSymbolWrapper
        onPress={onClickLeftSymbol}
        activeOpacity={onClickLeftSymbol ? 0.7 : 1}>
        {leftSymbol}
      </StyledLeftSymbolWrapper>
      <StyledField
        isActive={isActive}
        invalid={touched && withError && error}
        style={fieldStyle}
        editable={!isDisabled && !readOnly}
        placeholder={!isDisabled ? placeholder : null}
        placeholderTextColor={'rgba(182,182,182,0.47)'}
        secureTextEntry={isSecurity}
        leftSymbol={leftSymbol}
        rightSymbol={rightSymbol}
        keyboardAppearance="dark"
        onFocus={() => {
          setActive(true);
        }}
        onEndEditing={() => {
          setActive(false);
        }}
        {...rest}
      />
      <StyledRightSymbolWrapper
        onPress={onClickRightSymbol}
        activeOpacity={onClickRightSymbol ? 0.7 : 1}>
        {rightSymbol}
      </StyledRightSymbolWrapper>
      {/*{isCheck && !rest.meta.error && !meta.asyncValidating && (*/}
      {/*  <StyledRightSymbolWrapper>*/}
      {/*    <Icon*/}
      {/*      name="check-circle"*/}
      {/*      size={16}*/}
      {/*      color={theme.main.backgroundColors.green}*/}
      {/*    />*/}
      {/*  </StyledRightSymbolWrapper>*/}
      {/*)}*/}
      {touched && withError && error && (
        <StyledErrorText>{error}</StyledErrorText>
      )}
      {Boolean(additionalInfo) && (
        <StyledAdditionalInfoText>{additionalInfo}</StyledAdditionalInfoText>
      )}
    </StyledInputWrapper>
  );
};

BasicField.propTypes = {
  /**
   * Показывает задисейблен ли инпут
   */
  isDisabled: PropTypes.bool,
  /**
   * Отображать ли ошибку в инпуте
   */
  withError: PropTypes.bool,
  /**
   * Отображать ли ошибку при вводе
   */
  isValidChange: PropTypes.bool,
  /**
   * Плейсхолдер инпута
   */
  placeholder: PropTypes.string,
  /**
   * Лейбл инпута
   */
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  meta: PropTypes.shape({
    /**
     * Переменная с булевым значением, которое равняется true,
     * если поле прошло проверку на валидацию
     */
    valid: PropTypes.bool,
    /**
     * Текс ошибки, которая произошла при валидации
     */
    error: PropTypes.string,
    /**
     * Переменная с булевым значением, которое равняется true,
     * когда размывается фокус и происходит проверка поля
     */
    asyncValidating: PropTypes.bool,
    /**
     * Переменная с булевым значением, которое равняется true,
     * если значение поля совпадает с его инициализированным значением
     */
    pristine: PropTypes.bool,
  }),
  /**
   * Булевое значение, которое используется для определение типа 'password' если оно true
   */
  isSecurity: PropTypes.bool,
  /**
   * Показывает инпут будет доступен лишь для чтения или нет
   */
  readOnly: PropTypes.bool,
  /**
   * Доп инфо снизу-слева инпута
   */
  additionalInfo: PropTypes.string,
  /**
   * Левый символ в инпуте
   */
  leftSymbol: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Правый символ в инпуте
   */
  rightSymbol: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Callback по клику на левый символ
   */
  onClickLeftSymbol: PropTypes.func,
  /**
   * Callback по клику на правый символ
   */
  onClickRightSymbol: PropTypes.func,
  /**
   * Стили контейнера инпута
   */
  containerStyle: PropTypes.object,
  fieldType: PropTypes.string,
  isCheck: PropTypes.bool,
};

BasicField.defaultProps = {
  isDisabled: false,
  isCheck: false,
  meta: {
    error: '',
  },
  placeholder: '',
  label: '',
  isSecurity: false,
  readOnly: false,
  isValidChange: false,
  withError: true,
  additionalInfo: '',
  leftSymbol: null,
  rightSymbol: null,
  onClickLeftSymbol: null,
  onClickRightSymbol: null,
  containerStyle: {},
  fieldType: 'text',
};

export default BasicField;
