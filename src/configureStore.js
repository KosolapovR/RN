import {createStore, applyMiddleware, combineReducers} from 'redux';
import {entitiesReducer, queriesReducer, queryMiddleware} from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';
import {logger} from 'redux-logger';

import {reducer as form} from 'redux-form';

import {
  authTokenMiddleware,
  requestStartMiddleware,
  requestFailureMiddleware,
  requestSuccessMiddleware,
  pinCodeMiddleWare,
} from './middlewares';

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

  if (__DEV__) {
    // middlewares = [...middlewares, logger];
  }

  middlewares = applyMiddleware(...middlewares);

  return createStore(reducers, middlewares);
};

export default configureStore();
