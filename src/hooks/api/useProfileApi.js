import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {
  querySelectors,
  updateResults,
} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {List} from 'immutable';
import {
  getDealComments,
  getPublicUserProfile,
  getUserInfo,
  postDealCommentReply,
  putUserProfile,
  putUserInfoSettings,
} from '@cashelec/shared/api/users';
import endpoints from '@cashelec/shared/api/endpoints';
import {
  useISESelector,
  dealCommentsSelector,
  mapSelector,
  userSelector,
  userInfoSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   publicUser: Immutable.Map,
 *   profileUserInfo: Immutable.Map,
 *   currentUserInfo: Immutable.Map,
 *   dealComments: Immutable.List,
 *   dealCommentsMeta: Immutable.Map,
 *   putUserIsFetching: Boolean,
 *   profileIsFetching: Boolean,
 *   profileIsInitializing: Boolean,
 *   profileCommentsIsFetching: Boolean,
 *   getDealComments: Function,
 *   getPublicUserProfile: Function,
 *   getUserInfo: Function,
 *   postDealCommentReply: Function,
 *   putUserProfile: Function,
 *   putUserInfoSettings: Function,
 *   clearProfileComments: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      publicUser: userSelector(state, 'publicUser'),
      profileUserInfo: userInfoSelector(state, 'profileUserInfo'),
      currentUserInfo: userInfoSelector(state, 'currentUserInfo'),
      dealComments: dealCommentsSelector(state, 'dealComments'),
      dealCommentsMeta: mapSelector(state, 'dealCommentsMeta'),

      putUserIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: `put${endpoints.getPutUserProfileUrl()}`,
        }) ||
        querySelectors.isPending(state.get('queries'), {
          queryKey: `put${endpoints.getPutUserInfoSettingsUrl()}`,
        }) ||
        false,
      profileIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getPublicUserProfileUrl(),
        }) ||
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getUserInfoUrl(),
        }) ||
        false,
      profileIsInitializing:
        !!querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getPublicUserProfileUrl(),
        }) &&
        !!querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getUserInfoUrl(),
        }),
      profileCommentsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getCommentsUrl(),
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
          getDealComments,
          getPublicUserProfile,
          getUserInfo,

          postDealCommentReply,

          putUserProfile,
          putUserInfoSettings,
          clearProfileComments: () =>
            updateResults({
              profileComments: List(),
            }),
        },
        dispatch,
      ),
    [dispatch],
  );

  return {
    ...data,
    ...actions,
  };
};
