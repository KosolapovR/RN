import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  withRepeat,
} from 'react-native-reanimated';

import {SecondaryText} from 'components/styled';
import Arrow from 'assets/img/arrows/arrow-down-white.svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  align-self: stretch;
  position: relative;
  height: 100%;
`;

const ItemsList = styled.View`
  position: absolute;
  align-items: stretch;
  left: 0;
  right: 0;
`;

const Item = styled.TouchableOpacity`
  height: 40px;
  padding-top: 10px;
  padding-left: 15px;
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
`;

const InputWrapper = styled.TouchableOpacity`
  border-radius: ${(props) => props.theme.main.borderRadius};
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
`;

const Label = styled(SecondaryText)`
  margin-bottom: 10px;
`;

const StyledInput = styled.Text`
  color: ${(props) =>
    props.readOnly || props.isDisabled
      ? props.theme.main.colors.secondary
      : props.theme.main.colors.primary};
  height: 40px;
  padding-top: 10px;
  padding-left: 15px;
`;

const DropdownField = ({
  input: {onChange, value},
  meta: {},
  isDisabled,
  placeholder,
  readOnly,
  dropdownItems,
  label,
}) => {
  const [selectedItem, setSelectedItem] = useState(value);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const offset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(90);
  const arrowTop = useSharedValue(15);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
      opacity: opacity.value,
      zIndex: 100,
    };
  });

  const arrowAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
      alignSelf: 'flex-end',
      position: 'absolute',
      top: arrowTop.value,
      right: 15,
    };
  });

  useEffect(() => {
    if (isDropdownOpen) {
      offset.value = withSpring(20);
      opacity.value = withSpring(1);
      rotation.value = withTiming(-180);
    } else {
      offset.value = withSpring(0);
      opacity.value = withSpring(0);
      rotation.value = withTiming(0);
    }
  }, [isDropdownOpen]);

  const closeDropdown = () => setDropdownOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownOpen(false);
      }}>
      <Container>
        <Label>{label}</Label>
        <InputWrapper
          activeOpacity={readOnly || isDisabled ? 1 : 0.6}
          onPress={() => {
            readOnly || isDisabled ? null : toggleDropdown();
          }}>
          <StyledInput readOnly={readOnly} isDisabled={isDisabled}>
            {selectedItem ? selectedItem : placeholder}
          </StyledInput>
          <Animated.View
            style={[
              arrowAnimatedStyles,
              {
                position: 'absolute',
                right: 10,
                bottom: 0,
                top: 0,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon size={12} name="chevron-down" color="#b1b1b1" />
          </Animated.View>
        </InputWrapper>
        <Animated.View style={[animatedStyles]}>
          {isDropdownOpen && (
            <ItemsList>
              {dropdownItems.map((item) => (
                <Item
                  key={item.id}
                  onPress={() => {
                    if (isDropdownOpen) {
                      closeDropdown();
                      setSelectedItem(item.value);
                      onChange(item.value);
                    }
                  }}>
                  {item.element}
                </Item>
              ))}
            </ItemsList>
          )}
        </Animated.View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

DropdownField.propTypes = {
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  dropdownItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      element: PropTypes.node,
    }),
  ),
  label: PropTypes.string,
};

DropdownField.defaultProps = {
  isDisabled: false,
  placeholder: '',
  readOnly: false,
  dropdownItems: [],
  label: '',
};

export default DropdownField;
