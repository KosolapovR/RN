import { useRef, useState, useEffect } from 'react';

/**
 * Хук, который используется для обработки логики Dropdown` ов
 *
 * @param checkCloseDropdown {Boolean | Function} Функция которая возвращает
 * текущее состояние модалки ( Необязательный проп )
 *
 * @return dropdownRef {String} Ссылка на Dropdown
 * @return buttonRef {String} Ссылка на кнопку
 * @return isDropdownOpen {Boolean} Параметр стейта, показывающий открыт ли сейчас Dropdown
 * @return setDropdownOpen {Function} Функция меняющая состояние отображения Dropdown
 * @return toggleDropdown {Function} Функция которая меняет состояние по принципу переключателя
 * @return closeDropdown {Function} Функция которая закрывает Dropdown
 */

export default (checkCloseDropdown = false) => {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const closeDropdown = () => setDropdownOpen(false);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleOuterDropdownClick = (e) => {
      if (dropdownRef && dropdownRef.current
        && ((dropdownRef.current.contains(e.target) || buttonRef.current.contains(e.target))
          || (checkCloseDropdown && checkCloseDropdown())
        )) {
        return;
      }
      setDropdownOpen(false);
    };

    document.addEventListener('mousedown', handleOuterDropdownClick, false);

    return () => {
      document.removeEventListener('mousedown', handleOuterDropdownClick, false);
    };
  }, [checkCloseDropdown && checkCloseDropdown()]);

  return {
    dropdownRef,
    buttonRef,
    isDropdownOpen,
    setDropdownOpen,
    toggleDropdown,
    closeDropdown,
  };
};
