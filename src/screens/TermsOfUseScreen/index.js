// @flow
import React, {useContext} from 'react';
import {useToast} from 'react-native-styled-toast';
import {AuthContext} from 'context/AuthContext';
import {RowSpaceBetween, ScreenWrapper} from 'components/styled';
import DropdownField from 'components/fields/DropdownField';

const TermsOfUseScreen = ({navigation}: {navigation: Object}) => {
  const {signIn}: {signIn: Function} = useContext(AuthContext);
  const {toast}: {toast: Function} = useToast();

  return (
    <ScreenWrapper>

    </ScreenWrapper>
  );
};

export default TermsOfUseScreen;
