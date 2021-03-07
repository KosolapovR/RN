import {createStore, applyMiddleware, combineReducers} from 'redux';
import {
  entitiesReducer,
  queriesReducer,
  queryMiddleware,
} from 'redux-query-immutable';
import superagentInterface from 'redux-query-immutable-interface-superagent';

import {reducer as form} from 'redux-form';

import {
  authTokenMiddleware,
  requestStartMiddleware,
  requestFailureMiddleware,
  requestSuccessMiddleware,
  pinCodeMiddleWare,
} from './middlewares';
import {createLogger} from 'redux-logger';
import Immutable, {Iterable} from 'immutable';

const getQueries = (state) => state.queries;
const getEntities = (state) => state.entities;

const reducers = combineReducers({
  form,
  entities: entitiesReducer,
  queries: queriesReducer,
});

const configureStore = () => {
  let middlewares = [
    requestStartMiddleware,
    authTokenMiddleware,
    requestFailureMiddleware,
    requestSuccessMiddleware,
    pinCodeMiddleWare,
    queryMiddleware(superagentInterface, getQueries, getEntities),
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
    middlewares = [...middlewares, logger];
  }

  middlewares = applyMiddleware(...middlewares);

  return createStore(reducers, middlewares);
};

export default configureStore();
