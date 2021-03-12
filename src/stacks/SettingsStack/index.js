import * as React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import ProfileScreen from '../../screens/ProfileScreen';
import HelpIcon from 'assets/img/help/help.svg';
import styled, {
  ThemeProvider,
} from 'styled-components/native/dist/styled-components.native.esm';
import {useTheme} from 'styled-components';
import PersonalizationStack from '../PersonalizationStack';
import IconButton from 'components/buttons/IconButton';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const HeaderRightWrapper = styled.View`
  margin-right: 20px;
  flex: 1;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

const HeaderRight = ({navigation}) => {
  return (
    <HeaderRightWrapper>
      <IconButton
        icon={<HelpIcon width={40} />}
        onClick={() => navigation.navigate('Personalization')}
      />
    </HeaderRightWrapper>
  );
};

const SettingsStack = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({route}) => ({
            headerRight: () => <HeaderRight navigation={navigation} />,
            headerLeft: () => null,
            headerStyle: {
              backgroundColor: '#141416',
            },
          })}
        />
        <Stack.Screen name="Personalization" component={PersonalizationStack} />
      </Stack.Navigator>
    </View>
  );
};

SettingsStack.options = {
  headerStyle: {
    backgroundColor: '#141414',
  },
};

export default SettingsStack;
