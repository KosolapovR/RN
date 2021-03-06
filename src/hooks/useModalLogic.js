import { useState } from 'react';

/**
 * Хук, который используется для обработки логики работы с модалками
 *
 * если initialValue является стрингой, значит модалок больше одной.
 * Используем тип данных string для isModalOpen.
 *
 * @param initialValue {Boolean} Начальное состояние модалки
 *
 * @return isModalOpen {Boolean} Параметр стейта, показывающий открыта ли сейчас модалка
 * @return setIsModalOpen {Function} Функция меняющая состояние отображения модалки
 * @return openModal {Function} Функция открывающая модалку
 * @return closeModal {Function} Функция закрывающая модалку
 * @return toggleModal {Function} Функция которая меняет состояние отображения модалки
 * по принципу переключателя
 */

export default (initialValue = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialValue);
  const isManyModal = typeof initialValue === 'string';

  const closeModal = () => setIsModalOpen(isManyModal ? '' : false);
  const openModal = name => setIsModalOpen(isManyModal ? name : true);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
