import * as React from 'react';
import {useCallback, useContext} from 'react';
import styled from 'styled-components/native';
import AuthForm from '../../components/forms/AuthForm';
import {AuthContext} from '../../context/AuthContext';
import {postLogin} from 'api/auth/postLogin';
import {useDispatch} from 'react-redux';
import {mutateAsync, requestAsync} from 'redux-query-immutable/src/actions';
import useAuthApi from '../../hooks/api/useAuthApi';
import EncryptedStorage from 'react-native-encrypted-storage';

const Wrapper = styled.View`
  background-color: #141416;
  padding: 20px;
  flex: 1;
`;

const SignInScreen = () => {
  const {signIn} = useContext(AuthContext);
  const {postLogin} = useAuthApi();
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (formValues, dispatch, {change}) => {
      postLogin({
        requestBody: formValues,
      }).then(({body}) => {
        if (body && !body.error) {
          signIn(body.data.token);
        }
      });
    },

    [],
  );
  // const onSubmit = useCallback(
  //   (formValues) => {
  //     console.log('formValues', formValues);
  //
  //     dispatch(
  //       mutateAsync(
  //         postLogin({
  //           requestBody: formValues,
  //           successCallback: ({body, ...rest}) => {
  //             console.log('body', body);
  //             console.log('rest', rest);
  //           },
  //         }),
  //       ),
  //     );
  //   },
  //
  //   [],
  // );
  return (
    <Wrapper>
      <AuthForm onSubmit={onSubmit} />
    </Wrapper>
  );
};

export default SignInScreen;
