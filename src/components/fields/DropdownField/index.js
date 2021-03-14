import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

import {SecondaryText} from 'components/styled';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled.View`
  align-self: stretch;
  position: relative;
  margin-bottom: 10px;
`;

const Overlay = styled.TouchableOpacity`
  left: 0;
  position: ${({isIOS}) => (isIOS ? 'absolute' : 'relative')};
  top: ${({offsetTop}) => (offsetTop ? `${-offsetTop}px` : '0px')};
  width: ${({width}) => (width ? `${width - 40}px` : '0px')};
  height: ${({height}) => (height ? `${height - 40}px` : '0px')};
`;
const ItemsList = styled.View`
  top: ${({offsetTop}) => `${offsetTop}px`};
  align-items: stretch;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.main.backgroundColors.primary};
`;

const Item = styled.TouchableOpacity`
  height: 40px;
  border-top-width: ${({notFirst}) => (notFirst ? `1px` : `0px`)};
  border-style: solid;
  border-top-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighterHover};
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

const InputWrapper = styled.TouchableOpacity`
  border-radius: ${(props) => props.theme.main.borderRadius};
  background-color: ${(props) =>
    props.theme.main.backgroundColors.primaryLighter};
  height: 40px;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 30px;
`;

const Label = styled(SecondaryText)`
  margin-bottom: 10px;
`;

const StyledInput = styled.Text`
  color: ${(props) =>
    props.readOnly || props.isDisabled
      ? props.theme.main.colors.secondary
      : props.theme.main.colors.primary};
`;

const colors = ['rgb(27 27, 27)', 'rgb(35,35,39)'];

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
  const [itemListRef, setItemListRef] = useState();
  const [offsetTop, setOffsetTop] = useState(0);

  const offset = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(90);
  const arrowTop = useSharedValue(15);
  const itemColor = useSharedValue(colors[0]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: offset.value}],
      opacity: opacity.value,
      zIndex: 100,
    };
  });

  const animatedItemStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(itemColor.value, [0, 1], colors),
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
      itemColor.value = withTiming(1, {duration: 200, easing: Easing.linear});
      offset.value = withSpring(20);
      opacity.value = withSpring(1);
      rotation.value = withTiming(-180);
    } else {
      itemColor.value = withTiming(0, {duration: 200, easing: Easing.linear});

      offset.value = withSpring(0);
      opacity.value = withSpring(0);
      rotation.value = withTiming(0);
    }
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  //устанавливаем смещение оверлэй слоя в зависимости от положения дропдауна
  // для того что бы покрывать весь экран оверлэем
  useEffect(() => {
    if (itemListRef)
      setTimeout(() => {
        itemListRef.measure((fx, fy, width, height, px, py) => {
          setOffsetTop(py);
        });
      }, 0);
  }, [itemListRef]);

  return (
    <Container>
      {label !== '' && <Label>{label}</Label>}
      <InputWrapper
        activeOpacity={readOnly || isDisabled ? 1 : 0.6}
        onPress={() => {
          readOnly || isDisabled ? null : toggleDropdown();
        }}>
        {selectedItem ? (
          selectedItem
        ) : (
          <StyledInput readOnly={readOnly} isDisabled={isDisabled}>
            {placeholder}
          </StyledInput>
        )}
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
          <Overlay
            isIOS={Platform.OS === 'ios'}
            onPress={() => {
              if (isDropdownOpen) {
                closeDropdown();
              }
            }}
            width={windowWidth}
            height={windowHeight}
            offsetTop={offsetTop}>
            <ItemsList
              ref={(component) => setItemListRef(component)}
              offsetTop={offsetTop}>
              <Animated.View style={animatedItemStyles}>
                {dropdownItems.map((item, index) => (
                  <Item notFirst={!!index} key={item.id}>
                    <Pressable
                      onPress={() => {
                        if (isDropdownOpen) {
                          closeDropdown();
                          setSelectedItem(item.element);
                          onChange(item.value);
                        }
                      }}>
                      {item.element}
                    </Pressable>
                  </Item>
                ))}
              </Animated.View>
            </ItemsList>
          </Overlay>
        )}
      </Animated.View>
    </Container>
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
  offsetTop: PropTypes.number,
};

DropdownField.defaultProps = {
  isDisabled: false,
  placeholder: '',
  readOnly: false,
  dropdownItems: [],
  label: '',
  offsetTop: 0,
};

export default DropdownField;
