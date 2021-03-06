import { usePrevious } from 'react-use';
import _ from 'lodash';

// скрол знает о высоте шапки
const globalHeaderHeight = 61;

// скрол можно отменить
let scrollInterval;
const stopScroll = () => {
  if (scrollInterval) {
    clearInterval(scrollInterval);
  }
  scrollInterval = undefined;
};

// запускает плавный скрол к елементу или к топу
const smoothScrollTo = (refElement, {
  offsetTop = 0,
  isConsiderHeader = true,
} = {}) => new Promise((resolve) => {
  if (scrollInterval) {
    stopScroll(scrollInterval);
  }

  // корректировка позиции вертикали к которой скролить
  let y = _.get(refElement || {}, 'current.offsetTop', 0) + offsetTop;
  if (isConsiderHeader) {
    y -= globalHeaderHeight;
  }
  y = Math.max(y, 0);

  // скрол уже на месте
  if (window.scrollY === y) {
    resolve();
  }

  const scrollStep = Math.PI / (1000 / 15);
  let scrollCount = 0;
  let prevScrollPosition;

  scrollInterval = setInterval(() => { // animate with ease-in-out
    scrollCount += 1;
    const scrollHeight = Math.round(window.scrollY);
    const cosParameter = (scrollHeight - y);
    const scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
    const nextPos = Math.round(scrollHeight - scrollMargin);

    window.scrollTo(window.scrollX, nextPos);
    if (nextPos === y || prevScrollPosition === nextPos) {
      stopScroll();
      resolve();
    }
    prevScrollPosition = nextPos;
  }, 15);
});

const isFoundSubstr = (values, str) => values.some(substr => str.includes(substr));

/**
 * Хук для работы со скролом
 *
 * @param ref {String} Ссылка на место, до которого нужно скролить
 * @param offsetTop {Number} Показывает на сколько сместиться вверх
 * @param isPage {Boolean} Параметр, позволяющий включить автоскрол для страницы
 * @param isSmooth {Boolean} Параметр, который влияет на выбор типа скрола
 * @param isConsiderHeader {Boolean} Параметр, отвечающий за то,
 * будем ли мы учитывать заголовок в расчете скрола
 * @param excludePaths {Array} Массив с данными, в которых ищем заданое значение
 * @returns {{
 *   smoothScrollTo: {Object}, Обьект с информацией о том куда нам нужно скролить
 *   stopScroll: Function, Функция останавливающая скрол
 *   isScrollStoped: boolean, Параметр со значением, остановки скрола в текущий момент
 *  }}
 */
export default ({
  ref,
  offsetTop = 0,
  isPage = false,
  isSmooth = false,
  isConsiderHeader = true,
  excludePaths = [],
} = {}) => {
  const locationPath = _.get(window, 'location.pathname', '');
  const prevLocationPath = usePrevious(locationPath);

  // если нужен авто-скрол для страницы
  if (isPage && locationPath !== prevLocationPath && !isFoundSubstr(excludePaths, locationPath)) {
    // тип скрола
    if (isSmooth) {
      smoothScrollTo(ref, { offsetTop });
    } else {
      const y = _.get(ref || {}, 'current.offsetTop', 0) + offsetTop;
      window.scrollTo(0, isConsiderHeader ? y - globalHeaderHeight : y);
    }
  }

  return {
    smoothScrollTo,
    stopScroll,
    isScrollStoped: !scrollInterval,
  };
};
