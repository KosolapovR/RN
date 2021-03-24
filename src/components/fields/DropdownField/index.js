// @flow
import * as React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Platform} from 'react-native';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';

import {SecondaryText} from 'components/styled';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = (styled.View`
  align-self: stretch;
  margin-bottom: 10px;
  width: ${({width}) => `${width}px` || '100%'};
`: React.ComponentType<{width?: number | string}>);

const Overlay = styled.TouchableOpacity`
  left: 0;
  position: absolute;
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
  border-top-width: ${({notFirst}) => (notFirst ? '1px' : '0px')};
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
  isDisabled,
  placeholder,
  readOnly,
  dropdownItems,
  label,
  itemWidth,
  onSelect,
  initialItemId,
}: {
  isDisabled?: boolean,
  placeholder?: string,
  readOnly?: boolean,
  label?: string,
  itemWidth?: number | string,
  onSelect: Function,
  initialItemId?: string,
  dropdownItems: Array<{
    id: string,
    element?: React.Element<any>,
  }>,
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [itemListRef, setItemListRef] = useState();
  const [offsetTop, setOffsetTop] = useState(0);
  const [itemListHeight, setItemListHeight] = useState(0);

  const offset = useSharedValue(0);
  const dropdownItemsHeight = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(90);
  const arrowTop = useSharedValue(15);
  const itemColor = useSharedValue(colors[0]);

  const animatedStyles = useAnimatedStyle(() => {
    if (Platform.OS === 'android') {
      return {
        transform: [{translateY: offset.value}],
        opacity: opacity.value,
        height: dropdownItemsHeight.value,
      };
    } else {
      return {
        transform: [{translateY: offset.value}],
        opacity: opacity.value,
      };
    }
  });

  const animatedItemStyles = useAnimatedStyle(() => {
    return {
      width: itemWidth,
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
      itemColor.value = withTiming(1, {
        duration: 250,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      offset.value = withSpring(12, {
        duration: 250,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      if (Platform.OS === 'android') {
        opacity.value = withDelay(
          250,
          withSpring(1, {duration: 250, easing: Easing.cubic}),
        );
      } else {
        opacity.value = withSpring(1, {
          duration: 250,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });
      }
      rotation.value = withTiming(-180);
      if (Platform.OS === 'android') {
        dropdownItemsHeight.value = withTiming(itemListHeight + 15, {
          duration: 370,
          easing: Easing.cubic,
        });
      }
    } else {
      itemColor.value = withTiming(0, {duration: 250, easing: Easing.linear});
      offset.value = withSpring(0);
      opacity.value = withSpring(0);
      rotation.value = withTiming(0);
      if (Platform.OS === 'android') {
        dropdownItemsHeight.value = withTiming(0);
      }
    }
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  //устанавливаем смещение оверлэй слоя в зависимости от положения дропдауна
  // для того что бы покрывать весь экран оверлэем
  useEffect(() => {
    if (itemListRef) {
      setTimeout(() => {
        itemListRef.measure((fx, fy, width, height, px, py) => {
          setOffsetTop(py);
        });
      }, 0);
    }
  }, [itemListRef]);

  useEffect(() => {
    if (dropdownItems) {
      setItemListHeight(dropdownItems.length * 40);
    }
  }, []);

  useEffect(() => {
    if (initialItemId) {
      const initialItem = dropdownItems.find(
        (item) => item.id === initialItemId,
      );
      if (initialItem) {
        onSelect(initialItem.id);
        setSelectedItem(initialItem.element);
      }
    }
  }, [initialItemId]);

  return (
    <Container width={itemWidth}>
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
              ref={(component: any) => setItemListRef(component)}
              offsetTop={offsetTop}>
              <Animated.View style={animatedItemStyles}>
                {dropdownItems.map((item, index) => (
                  <Item
                    notFirst={!!index}
                    key={item.id}
                    onPress={() => {
                      if (isDropdownOpen) {
                        closeDropdown();
                        onSelect(item.id);
                        setSelectedItem(item.element);
                      }
                    }}>
                    {item.element}
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

DropdownField.defaultProps = {
  isDisabled: false,
  placeholder: '',
  readOnly: false,
  dropdownItems: [],
  label: '',
  itemWidth: '100%',
  initialItemId: '',
};

export default DropdownField;
