import _ from 'lodash';

// import {errorMessages as EM, errorCodes as EC} from 'shared';
import {Map} from 'immutable';
import store from '../configureStore';
import i18n from '../i18next';
import {Alert} from 'react-native';
import {useContext} from 'react';

const handleErrorMessage = (action) => {
  let message = _.get(action, 'responseBody.data');
  Alert.alert('message', message);
  if (typeof message !== 'string') {
    message = _.get(action, 'responseBody.data.message');
  }
  const errorCode = _.get(action, 'responseBody.errorCode');

  // if (message === EM.TERMS_NOT_CONFIRMED) {
  //   store.dispatch(updateResults({isTermsAccept: false}));
  //   return;
  // }

  // const defaultHandlingMessage = Object.entries(EM).find(
  //   ([, value]) => message === value,
  // );

  // TODO убрать обработку ошибок по тексту сообщению,
  // TODO после того как будут заведены с бэка все коды ошибок
  // if (defaultHandlingMessage) {
  //   // toast.error(i18n.t(`API_ERRORS.${defaultHandlingMessage[0]}`));
  //   return;
  // }
  // TODO END

  // if (EC[errorCode]) {
  //   // toast.error(i18n.t(`API_ERRORS.${EC[errorCode]}`));
  //   return;
  // }

  if (!action.meta.withoutErrorToast && action.meta.errorKey) {
    // toast.error(
    //   i18n.t(`API_ERRORS.${action.meta.errorKey}`, {
    //     ...(action.meta.errorParams || {}),
    //   }),
    // );
  }
};

/**
 * Если прилетела 401, удаляем токен и юзера из редакса, что перекинет нас на авторизацию.
 * Если запрос произошел с ошибкой, отображает тостер с текстом ошибки.
 * Тоаст можно отключить, передав параметр meta.withoutErrorToast: true.
 * Ключ ошибки для i18n передается в конфиге в поле meta.errorKey.
 * Если передан meta.errorCallback, он будет вызван.
 *
 * @return {void}
 */
export default () => (next) => (action) => {
  if (action.type === '@@query/REQUEST_FAILURE') {
    if (action.status === 401) {
      Alert.alert('Ошибка', 'Сессия истекла');
    } else {
      Alert.alert('Ошибка', `Статус ${action.status}`);
      handleErrorMessage(action);

      const {errorCallback} = action.meta;

      if (errorCallback && _.isFunction(errorCallback)) {
        errorCallback(action.responseBody);
      }
    }
  }

  return next(action);
};
