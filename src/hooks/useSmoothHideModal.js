import { useState } from 'react';

/**
 * Хук для плавного скрывания модалки
 *
 * @param callback {Function} Келбек ,который выполнится при изменении значения стейта
 *
 * @return modalStyles {Object} Стили для скрывания модалки
 * @return onModalClose {Function} Функция которая закрывает модалку
 * @return onMakeModalSmoothClose {Function} Функция для плавного скрывания модалки
 */
const useSmoothHideModal = (callback) => {
  const [modalStyles, setModalStyles] = useState();

  const onMakeModalSmoothClose = () => {
    setModalStyles({ opacity: 0 });

    setTimeout(() => {
      if (callback) {
        callback();
      }
      setModalStyles({});
    }, 500);
  };

  return { modalStyles, onModalClose: onMakeModalSmoothClose };
};

export default useSmoothHideModal;
