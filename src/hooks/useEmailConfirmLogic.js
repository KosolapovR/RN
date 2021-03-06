import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getResendEmailConfirm } from 'api/auth';
import { useUser } from 'hooks/api';

/**
 * Хук для работы с логикой потдверждения почты
 *
 * @return needToConfirmEmail{Boolean} Параметр, который показывает,
 * нужно ли пользователю подтвердить почту или нет
 * @return isConfirmationEmailSend {Boolean} Параметр, который показывает,
 * отправлено ли подтверждение почты
 * @return canShowModal {Boolean} Параметр, который показывает, открыта ли сейчас модалка
 * @return onOpenModal {Function} Функциия, которая открывает модалку
 * @return denyEmailConfirmation {Function} Функция, закрывающая мадалку,
 * при отклонении подтверждения почты
 * @return onConfirmEmail {Function} Функция, которая закрывает модалку
 * и отправяет подтверждение на почту юзера
 */
export default () => {
  const { user } = useUser();
  const needToConfirmEmail = !user.get('isConfirm');

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getResendEmailConfirm,
  }, dispatch),
  [dispatch]);

  return {
    needToConfirmEmail,
    onConfirmEmail: () => actions.getResendEmailConfirm({
      email: encodeURIComponent(user.get('email')),
    }),
  };
};
