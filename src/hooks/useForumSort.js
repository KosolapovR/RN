import { useState } from 'react';
import { apiConstants } from 'consts';

/**
 * Хук для сортировки по форуму
 *
 * @param callback {Function} Келбек для изменения состояния
 * @param initialSortType {String} Изначальный тип сортировки (По дате)
 *
 * @return sortType {String} Тип сортировки
 * @param setSortType {Function} Функция которая изменяет тип сортировки
 */
export default (callback, initialSortType = apiConstants.topicsSort.byDate) => {
  const [sortType, setSortType] = useState(initialSortType);

  return {
    sortType,
    setSortType: (sort) => {
      setSortType(sort);
      if (callback) callback(sort);
    },
  };
};
