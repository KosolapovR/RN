import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {useSharedValue} from 'react-native-reanimated';

import Arrow from '../../../assets/img/arrows/arrow-down-white.svg';

const Container = styled.View`
  align-self: stretch;
  position: relative;
  background-color: green;
  height: 100%;
`;

const ItemsList = styled.View`
  position: absolute;
  align-items: stretch;
  left: 0;
  right: 0;
`;

const Item = styled.TouchableOpacity`
  border-bottom-color: white;
  border-style: solid;
  height: 40px;
  padding-top: 10px;
  padding-left: 15px;
  background-color: ${props =>
    props.theme.main.backgroundColors.primaryLighter};
`;

const InputWrapper = styled.TouchableOpacity`
  border-radius: ${props => props.theme.main.borderRadius};
  background-color: ${props =>
    props.theme.main.backgroundColors.primaryLighter};
`;

const Label = styled.Text`
  color: ${props => props.theme.main.colors.secondary};
  margin-bottom: 10px;
`;

const StyledInput = styled.Text`
  color: ${props =>
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
  const rotation = useSharedValue(0);
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
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
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
      rotation.value = withTiming(180, {
        duration: 250,
        easing: Easing.ease,
      });
      arrowTop.value = withTiming(15, {
        duration: 250,
        easing: Easing.ease,
      });
    } else {
      offset.value = withSpring(0);
      opacity.value = withSpring(0);
      rotation.value = withTiming(0, {
        duration: 250,
        easing: Easing.ease,
      });
      arrowTop.value = withTiming(20, {
        duration: 250,
        easing: Easing.ease,
      });
    }
  }, [isDropdownOpen]);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const closeDropdown = () => setDropdownOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  let childrenIds;

  return (
    <Container
      onStartShouldSetResponder={evt => {
        evt.persist();
        // console.log('evt.target', evt.target);

        if (childrenIds && childrenIds.length) {
          if (childrenIds.includes(evt.target)) {
            return;
          }
          // console.log('Tapped outside');
        }
      }}>
      <Label>{label}</Label>
      <InputWrapper
        activeOpacity={readOnly || isDisabled ? 1 : 0.6}
        onPress={() => {
          readOnly || isDisabled ? null : toggleDropdown();
        }}>
        <StyledInput readOnly={readOnly} isDisabled={isDisabled}>
          {selectedItem ? selectedItem : placeholder}
        </StyledInput>
        <Animated.Text style={[arrowAnimatedStyles]}>
          <Arrow />
        </Animated.Text>
      </InputWrapper>
      <Animated.View style={[animatedStyles]}>
        {isDropdownOpen && (
          <ItemsList
            ref={component => {
              // console.log('component', component);
              // console.log('component._children[0]', component._children[0]);
              childrenIds = [];
              // if (component) {
              //   childrenIds = component._children[0]._children.map(
              //     el => el._nativeTag,
              //   );
              // }
              // console.log('childrenIds', childrenIds);
            }}>
            {dropdownItems.map(item => (
              <Item
                key={item.id}
                activeOpacity={0.6}
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
