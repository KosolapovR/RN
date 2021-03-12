import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

function CustomBottomTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const renderIcon = options.tabBarIcon;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : options.tabBarIcon !== undefined
            ? options.tabBarIcon
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              paddingTop: 10,
              paddingBottom: 10,
              alignItems: 'center',
            }}>
            {renderIcon ? (
              renderIcon({isFocused})
            ) : (
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomBottomTabBar;
