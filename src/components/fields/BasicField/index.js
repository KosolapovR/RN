import * as React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import debounce from 'lodash.debounce';

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
  top: 36px;
  z-index: 1;
`;

const StyledField = styled.TextInput`
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
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

const areEqual = (prevProps, nextProps) =>
  prevProps.additionalInfo === nextProps.additionalInfo &&
  prevProps.readOnly === nextProps.readOnly &&
  prevProps.input.value === nextProps.input.value &&
  prevProps.meta.error === nextProps.meta.error &&
  prevProps.meta.active === nextProps.meta.active &&
  prevProps.meta.touched === nextProps.meta.touched &&
  prevProps.isDisabled === nextProps.isDisabled &&
  prevProps.rightSymbol === nextProps.rightSymbol &&
  prevProps.leftSymbol === nextProps.leftSymbol;

const BasicField = React.memo(
  ({
    input,
    meta,
    isDisabled,
    placeholder,
    label,
    withError,
    isValidChange,
    isSecurity,
    readOnly,
    additionalInfo,
    leftSymbol,
    rightSymbol,
    onClickLeftSymbol,
    onClickRightSymbol,
    containerStyle,
    fieldStyle,
  }) => {
    const [DebounceInputValue, setDebounceInputValue] = useState(input.value);
    const [debouncing, setDebouncing] = useState(false);
    const lastInputValue = useRef(input.value);

    useEffect(() => {
      if (debouncing) {
        return;
      }
      if (input.value === lastInputValue.current) {
        return;
      }

      lastInputValue.current = input.value;
      setDebounceInputValue(input.value);
    }, [debouncing, input.value]);

    const call = useMemo(
      () =>
        debounce((onChange, evt) => {
          setDebouncing(false);
          onChange(evt);
        }, 270),
      [setDebouncing],
    );

    const onChange = useCallback(
      (evt) => {
        evt.persist();
        setDebouncing(true);
        call(input.onChange, evt);
        setDebounceInputValue(evt.nativeEvent.text);
      },
      [setDebouncing, call, setDebounceInputValue],
    );

    const onEndEditing = useCallback(
      (evt) => {
        call.cancel();
        setDebouncing(false);
        input.onChange(evt);
        if (input.onBlur) {
          input.onBlur(evt);
        }
      },
      [call, setDebouncing, input.onChange, input.onBlur],
    );

    const invalid =
      ((!meta.active && meta.touched) || (isValidChange && !meta.pristine)) &&
      withError &&
      meta.error;

    return (
      <StyledInputWrapper style={containerStyle}>
        {Boolean(label) && (
          <StyledLabel isDisabled={isDisabled} invalid={Boolean(invalid)}>
            {label}
          </StyledLabel>
        )}
        <StyledLeftSymbolWrapper
          onPress={onClickLeftSymbol}
          activeOpacity={onClickLeftSymbol ? 0.7 : 1}>
          {leftSymbol}
        </StyledLeftSymbolWrapper>
        <StyledField
          invalid={Boolean(invalid)}
          style={fieldStyle}
          editable={!isDisabled && !readOnly}
          {...input}
          onChange={onChange}
          onEndEditing={onEndEditing}
          value={DebounceInputValue}
          placeholder={!isDisabled ? placeholder : null}
          placeholderTextColor={'rgba(182,182,182,0.47)'}
          secureTextEntry={isSecurity}
          leftSymbol={leftSymbol}
          rightSymbol={rightSymbol}
        />
        <StyledRightSymbolWrapper
          onPress={onClickRightSymbol}
          activeOpacity={onClickRightSymbol ? 0.7 : 1}>
          {rightSymbol}
        </StyledRightSymbolWrapper>
        {invalid && <StyledErrorText>{meta.error}</StyledErrorText>}
        {Boolean(additionalInfo) && (
          <StyledAdditionalInfoText>{additionalInfo}</StyledAdditionalInfoText>
        )}
      </StyledInputWrapper>
    );
  },
  areEqual,
);

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
};

BasicField.defaultProps = {
  isDisabled: false,
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
