import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors, updateResults, updateEntities } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import {
  deleteSession,
  deleteSessions,
  deleteUserPinCode,

  getAuthHistory,
  getChatKey,
  getLogHistory,
  getPasscode,
  getSecretQuestions,
  getSessions,

  postUserReserveEmail,

  putConfirmService,
  putConnectService,
  putDisconnectService,
  putUser,
  putUserCryptoPriority,
  putUserCryptoSelected,
  putUserCurrency,
  putUserExchange,
  putUserLanguage,
  putUserPinCode,
  putUserSafetyInOutSettings,
  putUserSecretQuestions,
} from 'api/users';
import endpoints from 'api/endpoints';
import {
  useISESelector,
  mapSelector,
  listSelector,
  primitiveSelector,
  sessionsSelector,
  authHistorySelector,
  logHistorySelector,
} from './selectors';

/**
 *
 * @returns {{
 *   sessions: Immutable.List,
 *   secretQuestions: Immutable.List,
 *   chatKey: String,
 *   authHistory: Immutable.List,
 *   authHistoryMeta: Immutable.Map,
 *   logHistory: Immutable.List,
 *   logHistoryMeta: Immutable.Map,
 *   authHistoryIsLoading: Boolean,
 *   logHistoryIsFetching: Boolean,
 *   chatKeyIsLoading: Boolean,
 *   sessionsIsFetching: Boolean,
 *   secretQuestionsIsFetching: Boolean,
 *   deleteSession: Function,
 *   deleteSessions: Function,
 *   getAuthHistory: Function,
 *   getChatKey: Function,
 *   getLogHistory: Function,
 *   getPasscode: Function,
 *   getSecretQuestions: Function,
 *   getSessions: Function,
 *   postUserReserveEmail: Function,
 *   putConfirmService: Function,
 *   putConnectService: Function,
 *   putDisconnectService: Function,
 *   putUser: Function,
 *   putUserCryptoPriority: Function,
 *   putUserCryptoSelected: Function,
 *   putUserCurrency: Function,
 *   putUserExchange: Function,
 *   putUserLanguage: Function,
 *   putUserPinCode: Function,
 *   putUserSafetyInOutSettings: Function,
 *   putUserSecretQuestions: Function,
 *   updateSessionEntities: Function,
 *   updateSessionResults: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    sessions: sessionsSelector(state, 'sessions'),
    secretQuestions: listSelector(state, 'secretQuestions'),
    chatKey: primitiveSelector(state, 'chatKey', ''),
    authHistory: authHistorySelector(state, 'authHistory'),
    authHistoryMeta: mapSelector(state, 'authHistoryMeta'),
    logHistory: logHistorySelector(state, 'logHistory'),
    logHistoryMeta: mapSelector(state, 'logHistoryMeta'),

    authHistoryIsLoading: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getAuthHistoryUrl({}) },
    ),
    logHistoryIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getLogHistoryUrl({}) },
    ),
    chatKeyIsLoading: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getChatkeyUrl({}) },
    ),
    sessionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSessionsUrl() },
    ) || false,
    secretQuestionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSessionsUrl() },
    ) || false,
  }), []);

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    deleteSession,
    deleteSessions,
    deleteUserPinCode,

    getAuthHistory,
    getChatKey,
    getLogHistory,
    getPasscode,
    getSecretQuestions,
    getSessions,

    postUserReserveEmail,

    putConfirmService,
    putConnectService,
    putDisconnectService,
    putUser,
    putUserCryptoPriority,
    putUserCryptoSelected,
    putUserCurrency,
    putUserExchange,
    putUserLanguage,
    putUserPinCode,
    putUserSafetyInOutSettings,
    putUserSecretQuestions,

    updateSessionEntities: sessions => updateEntities({
      sessions,
    }),
    updateSessionResults: sessions => updateResults({
      sessions: sessions.map(session => session.get('id')),
    }),
  }, dispatch),
  [dispatch]);

  const deleteAllOtherSessions = useCallback(() => {
    const onlyCurrentSession = data.sessions.filter(session => session.get('isCurrentSession'));
    actions.updateSessionEntities(onlyCurrentSession);
    actions.updateSessionResults(onlyCurrentSession);
  }, [data.sessions]);

  return {
    ...data,
    ...actions,
    deleteAllOtherSessions,
  };
};
