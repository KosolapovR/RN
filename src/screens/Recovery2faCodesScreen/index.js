import * as React from 'react';
import {useCallback} from 'react';
import styled from 'styled-components/native';
import RecoveryPasswordForm from 'components/forms/RecoveryPasswordForm';
import FormWrapper from 'components/forms/FormWrapper';
import useAuthApi from '../../hooks/api/useAuthApi';
import AttentionBlock from 'components/blocks/AttentionBlock';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const Recovery2faCodesScreen = ({navigation}) => {
  const {getPasswordRecovery} = useAuthApi();

  const onSubmit = useCallback(
    (formValues) => {
      const email = formValues.toJS().email;

      getPasswordRecovery({
        requestBody: {email: encodeURIComponent(email)},
        successCallback: () => {
          navigation.navigate('RecoverySuccess', {
            mailService: email.split('@')[1],
          });
        },
      });
    },

    [],
  );
  return (
    <Wrapper>
      <AttentionBlock
        text={
          'Скачайте коды восстановления до того, как подключите 2FA. Вы сможете использовать их, если потеряете возможность получить код.'
        }
      />
    </Wrapper>
  );
};

export default Recovery2faCodesScreen;
