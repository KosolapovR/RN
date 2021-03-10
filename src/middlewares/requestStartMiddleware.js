import {Iterable} from 'immutable';

/**
 * Добавляем стандартные поля к каждому запросу:
 * force: true,
 * meta: {},
 * body: body.toJS() (если оно было Immutable)
 * update: {},
 *
 * @return {void}
 */
export default () => (next) => (action) => {
  if (action.type || action.type) {
    const callAPI = action;

    if (!action.force) {
      callAPI.force = true;
    }

    if (!action.meta) {
      callAPI.meta = {};
    }

    if (!action.update) {
      callAPI.update = {};
    }

    if (action.body && Iterable.isIterable(action.body)) {
      callAPI.body = action.body.toJS();
    }
  }

  return next(action);
};
