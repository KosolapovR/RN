// @flow
import * as React from 'react';
import {useCallback, useContext, useEffect} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import Clipboard from '@react-native-clipboard/clipboard';
import RNFS from 'react-native-fs';

import useAuthApi from 'hooks/api/useAuthApi';
import AttentionBlock from 'components/blocks/AttentionBlock';
import {SecondaryText} from 'components/styled';
import RecoveryCodesBlock from 'components/blocks/RecoveryCodesBlock';
import BasicButton from 'components/buttons/BasicButton';
import {AuthContext} from 'context/AuthContext';
import {getErrorToastConfig, getSuccessToastConfig} from '../../utils/toast';
import {useToast} from 'react-native-styled-toast';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = (styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`: React.ComponentType<{}>);

const ButtonsWrapper = styled.View`
  height: 160px;
  justify-content: space-between;
  margin-top: 20px;
`;

const RecoveryCodesScreen = ({
  navigation,
  route,
}: {
  navigation: Object,
  route: Object,
}) => {
  const {signIn} = useContext(AuthContext);
  const {toast} = useToast();
  const {recoveryCodes, get2faCodesIsFetching, get2faCodes} = useAuthApi();
  const {id2FA} = route.params;

  useEffect(() => {
    get2faCodes();
  }, []);

  const handleSkip = useCallback(async () => {
    const token = await EncryptedStorage.getItem('AUTH_TOKEN_BEFORE_2FA');
    signIn(token);
  }, []);

  const handleContinue = useCallback(() => {
    console.log('id2FA before navigation', id2FA);
    navigation.navigate('Connection2fa', {id2FA});
  }, []);

  const handleDownloadCodes = useCallback(() => {
    const path = RNFS.DocumentDirectoryPath + '/recovery-codes.txt';

    RNFS.writeFile(path, recoveryCodes.toJS().join(' '), 'utf8')
      .then(() => {
        toast({
          ...getSuccessToastConfig({
            message: 'Файл скачан',
          }),
        });
      })
      .catch((err) => {
        toast({
          ...getErrorToastConfig({
            message: err.message,
          }),
        });
      });
  }, []);

  const handleCopyCodes = useCallback(async () => {
    Clipboard.setString(recoveryCodes.toJS().join(' '));
    toast({
      ...getSuccessToastConfig({
        message: 'Коды успешно скопированы в буфер обмена',
      }),
    });
  }, []);

  return (
    <Wrapper>
      <ScrollView>
        <AttentionBlock
          text={
            'Скачайте коды восстановления до того, как подключите 2FA. Вы сможете использовать их, если потеряете возможность получить код.'
          }
        />
        <SecondaryText paddingTop={15} paddingBottom={15}>
          Коды восстановления:
        </SecondaryText>
        <RecoveryCodesBlock
          codes={recoveryCodes}
          isFetching={get2faCodesIsFetching}
          onClickCopy={handleCopyCodes}
        />
        <ButtonsWrapper>
          <BasicButton
            onClick={handleDownloadCodes}
            color={'secondary'}
            title={'Скачать коды восстановления'}
          />
          <BasicButton
            onClick={handleContinue}
            color={'primary'}
            title={'Продолжить'}
          />
          <BasicButton onClick={handleSkip} title={'Не подключать 2fa'} />
        </ButtonsWrapper>
      </ScrollView>
    </Wrapper>
  );
};

export default RecoveryCodesScreen;
