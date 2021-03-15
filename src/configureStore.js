import {createStore, applyMiddleware} from 'redux';

import {queryMiddleware} from '@digitalwing.co/redux-query-immutable';

import reducers, {getQueries, getEntities, getResults} from './reducers';

import {
  authTokenMiddleware,
  requestStartMiddleware,
  requestFailureMiddleware,
  requestSuccessMiddleware,
  pinCodeMiddleWare,
} from './middlewares';
import {createLogger} from 'redux-logger';
import Immutable from 'immutable';

const configureStore = () => {
  let middlewares = [
    requestStartMiddleware,
    authTokenMiddleware,
    requestFailureMiddleware,
    requestSuccessMiddleware,
    pinCodeMiddleWare,
    queryMiddleware(getQueries, getEntities, getResults),
  ];

  const logger = createLogger({
    stateTransformer: (state) => {
      let newState = {};

      for (let i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
          newState[i] = state[i].toJS();
        } else {
          newState[i] = state[i];
        }
      }

      return newState;
    },
  });

  if (__DEV__) {
    // middlewares = [...middlewares, logger];
  }

  middlewares = applyMiddleware(...middlewares);

  return createStore(reducers, middlewares);
};

export default configureStore();
