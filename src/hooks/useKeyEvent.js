import { useEffect } from 'react';

/**
 * Хук для обработки ключевых событий
 *
 * @param code {String} Строка с именем кнопки ,которая будет тригерить событие
 * @param needToPrevent {String} Строка, наличие которой предотвращает
 *        обработку события по умолчанию
 * @param needToStop {String} Строка, наличие которой прекращает дальнейшую
 *        передачу текущего события
 * @param element {String} Ссылка на текущий елемент
 * @param callback {Function} Функция которая сработает при выполнении одного из условий
 * @param capture {Boolean} Значение указывающее,на то что события этого типа будут отправлены
 * listener перед отправкой на EventTarget
 */
function useKeyEvent({
  code,
  needToPrevent,
  needToStop,
  element,
  callback,
  capture = false,
}) {
  useEffect(
    () => {
      if (element && element.addEventListener) {
        const handler = (event) => {
          if (needToPrevent) {
            event.preventDefault();
          }
          if (needToStop) {
            event.stopPropagation();
          }
          if (event.code === code) {
            callback();
          }
        };

        element.addEventListener('keydown', handler, capture);

        return () => element.removeEventListener('keydown', handler);
      }

      return undefined;
    },
    [element, capture],
  );
}

useKeyEvent.Enter = 'Enter';
useKeyEvent.Backspace = 'Backspace';
useKeyEvent.Delete = 'Delete';

export default useKeyEvent;
