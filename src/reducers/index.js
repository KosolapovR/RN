import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form/immutable';
import {
  entitiesReducer,
  queriesReducer,
  resultsReducer,
} from '@digitalwing.co/redux-query-immutable';

export const getQueries = (state) => state.queries;
export const getEntities = (state) => state.entities;
export const getResults = (state) => state.results;

export default combineReducers({
  form,
  entities: entitiesReducer,
  queries: queriesReducer,
  results: resultsReducer,
});
