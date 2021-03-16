import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {
  querySelectors,
  updateEntities,
  updateResults,
} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {
  getCheckPin,
  getNotifications,
  getPublicUserProfile,
  getReadNotifications,
  getSendReserveEmailConfirm,
  getTerms,
  getUser,
  getUserLocation,
  getUserMessages,
  getUsersOnline,
  postLogOut,
  putAcceptTerms,
  putChangeUserLanguage,
  putStep,
  putFavoriteCrypto,
} from '@cashelec/shared/api/users';
import endpoints from '@cashelec/shared/api/endpoints';
import {normalize} from 'normalizr';
import {notification} from '@cashelec/shared/schemas';
import {fromJS} from 'immutable';

import {
  useISESelector,
  mapSelector,
  userSelector,
  usersSelector,
  userMessagesSelector,
  notificationsSelector,
  primitiveSelector,
  termsSelector,
  listSelector,
  entitiesSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   publicUser: Immutable.List,
 *   onlineUsers: Immutable.List,
 *   userMessages: Immutable.List,
 *   userMessagesMeta: Immutable.Map,
 *   notificationsMeta: Immutable.Map,
 *   isNotificationsUnread: Boolean,
 *   notificationEntities: String,
 *   notificationResults: Immutable.List,
 *   notifications: Immutable.List,
 *   terms: Immutable.List,
 *   isTermsAccept: String,
 *   translationFetchingStatus: String,
 *   userLocation: Immutable.Map,
 *   userIsFetching: Boolean,
 *   notificationsIsFetching: Boolean,
 *   userIsInitializing: Boolean,
 *   isUserLoggedIn: Boolean,
 *   putAcceptTermsIsFetching: Boolean,
 *   isUserMessagesFetching: Boolean,
 *   userLocationIsFetching: Boolean,
 *   onlineUsersIsFetching: Boolean,
 *   checkPinIsFetching: Boolean,
 *   getCheckPin: Function,
 *   getNotifications: Function,
 *   getPublicUserProfile: Function,
 *   getReadNotifications: Function,
 *   getSendReserveEmailConfirm: Function,
 *   getTerms: Function,
 *   getUser: Function,
 *   getUserLocation: Function,
 *   getUserMessages: Function,
 *   getUsersOnline: Function,
 *   postLogOut: Function,
 *   putAcceptTerms: Function,
 *   putChangeUserLanguage: Function,
 *   putStep: Function,
 *   updateNotificationEntities: Function,
 *   updateNotificationResults: Function,
 *   setNotificationsRead: Function,
 *   setIsTermsAccept: Function,
 *   setTranslationFetchingStatus: Function,
 *   updateNotifications: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      publicUser: userSelector(state, 'publicUser'),
      onlineUsers: usersSelector(state, 'onlineUsers'),
      userMessages: userMessagesSelector(state, 'userMessages'),
      userMessagesMeta: mapSelector(state, 'userMessagesMeta'),
      notificationsMeta: mapSelector(state, 'notificationsMeta'),
      isNotificationsUnread: primitiveSelector(
        state,
        'isNotificationsUnread',
        false,
      ),
      notificationEntities: entitiesSelector(state, 'notification'),
      notificationResults: listSelector(state, 'notifications'),
      notifications: notificationsSelector(state, 'notifications'),
      terms: termsSelector(state, 'terms'),
      isTermsAccept: primitiveSelector(state, 'isTermsAccept', true),
      translationFetchingStatus: primitiveSelector(
        state,
        'translationFetchingStatus',
        '',
      ),
      userLocation: mapSelector(state, 'userLocation'),

      userIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: `getUser${endpoints.getUserUrl()}`,
        }) ||
        querySelectors.isPending(state.get('queries'), {
          queryKey: `get${endpoints.getUserUrl()}`,
        }) ||
        false,
      notificationsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getNotificationsUrl(),
        }) || false,
      userIsInitializing: !(
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: `getUser${endpoints.getUserUrl()}`,
        }) ||
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: `get${endpoints.getUserUrl()}`,
        })
      ),
      isUserLoggedIn: !!(
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getLoginUrl(),
        }) ||
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getLogin2faUrl(),
        }) ||
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getConfirmUrl(),
        }) ||
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getPasswordRecovery2faUrl(),
        }) ||
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getConfirmEmailUrl(),
        }) ||
        querySelectors.lastUpdated(state.get('queries'), {
          queryKey: `post${endpoints.getPasswordRecoveryUrl()}`,
        })
      ),
      putAcceptTermsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getAcceptTermsUrl(),
        }) || false,
      getTermsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getTermsUrl(),
        }) || false,
      isUserMessagesFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getForumUserMessages(),
        }) || false,
      userLocationIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getUserLocationUrl(),
        }) || false,
      onlineUsersIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getUsersOnlineUrl(),
        }) || false,
      checkPinIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getCheckPinUrl(),
        }) || false,
    }),
    [],
  );

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          getCheckPin,
          getNotifications,
          getPublicUserProfile,
          getReadNotifications,
          getSendReserveEmailConfirm,
          getTerms,
          getUser,
          getUserLocation,
          getUserMessages,
          getUsersOnline,

          postLogOut,

          putAcceptTerms,
          putChangeUserLanguage,
          putStep,
          putFavoriteCrypto,
          updateNotificationEntities: (notificationEntities) =>
            updateEntities({
              notification: notificationEntities,
            }),
          updateNotificationResults: (notificationResults) =>
            updateResults({
              notifications: notificationResults,
              isNotificationsUnread: true,
            }),
          setNotificationsRead: () =>
            updateResults({
              isNotificationsUnread: false,
            }),
          setIsTermsAccept: (status) =>
            updateResults({
              isTermsAccept: status,
            }),
          setTranslationFetchingStatus: (status) =>
            updateResults({
              translationFetchingStatus: status,
            }),
        },
        dispatch,
      ),
    [dispatch],
  );

  const updateNotifications = useCallback(
    (newNotification) => {
      const {entities} = normalize(newNotification, notification.schema);
      let resultsArray = data.notificationEntities.toJS();
      resultsArray = {
        [newNotification.id]: newNotification,
        ...resultsArray,
      };

      resultsArray = Object.keys(resultsArray).sort(
        (previous, next) =>
          new Date(resultsArray[next].date) -
          new Date(resultsArray[previous].date),
      );

      actions.updateNotificationEntities(
        data.notificationEntities.mergeDeep(fromJS(entities.notification)),
      );
      actions.updateNotificationResults(fromJS(resultsArray));
    },
    [data.notificationEntities],
  );

  return {
    ...data,
    ...actions,
    updateNotifications,
  };
};
