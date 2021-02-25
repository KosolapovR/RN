import React, {PureComponent} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const StyledRadioButton = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => (props.checked ? 'red' : 'blue')};
`;

const RadioField = ({input, radios}) => {
  return (
    <View>
      {radios.map((radio, index) => (
        <TouchableHighlight
          key={radio}
          onPress={() => {
            input.onChange(index);
          }}>
          <View>
            <StyledRadioButton checked={input.value === index} />
            <View>
              <Text />
            </View>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default RadioField;
