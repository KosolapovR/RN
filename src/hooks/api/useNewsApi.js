import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {querySelectors} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {Map} from 'immutable';
import {
  getNews,
  getNewsSearch,
  getSingleNews,
  getStories,
  postNewsComment,
  putMarkStoryAsViewed,
} from '@cashelec/shared/api/news';
import endpoints from '@cashelec/shared/api/endpoints';
import {
  useISESelector,
  mapSelector,
  storiesSelector,
  newsSelector,
  singleNewsSelector,
} from './selectors';

/**
 * @returns {{
 *   stories: Immutable.List,
 *   newsList: Immutable.List,
 *   newsSearchList: Immutable.List,
 *   singleNews: Immutable.Map,
 *   singleNewsComments: Immutable.Map,
 *   firstNews: Immutable.Map,
 *   newsListMeta: Immutable.Map,
 *   newsSearchListMeta: Immutable.Map,
 *   storiesIsFetching: Boolean,
 *   newsIsFetching: Boolean,
 *   singleNewsIsFetching: Boolean,
 *   postNewsCommentIsFetching: Boolean,
 *   newsSearchIsFetching: Boolean,
 *   getNews: Function,
 *   getNewsSearch: Function,
 *   getSingleNews: Function,
 *   getStories: Function,
 *   postNewsComment: Function,
 *   putMarkStoryAsViewed: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      stories: storiesSelector(state, 'stories'),
      newsList: newsSelector(state, 'news'),
      newsSearchList: newsSelector(state, 'newsSearch'),
      singleNews: singleNewsSelector(state, 'singleNews'),
      singleNewsComments: mapSelector(state, 'singleNewsComments'),
      firstNews: newsSelector(state, 'firstNews').first() || Map(),
      newsListMeta: mapSelector(state, 'newsMeta'),
      newsSearchListMeta: mapSelector(state, 'newsSearchMeta'),

      storiesIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getStoriesUrl(),
        }) || false,
      newsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getNewsUrl(),
        }) || false,
      singleNewsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getSingleNewsUrl(),
        }) || false,
      postNewsCommentIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getNewsCommentsUrl(),
        }) || false,
      newsSearchIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getNewsSearchUrl(),
        }) ||
        !querySelectors.lastUpdated(state.get('queries'), {
          queryKey: endpoints.getNewsSearchUrl(),
        }) ||
        false,
    }),
    [],
  );

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          getNews,
          getNewsSearch,
          getSingleNews,
          getStories,
          postNewsComment,
          putMarkStoryAsViewed,
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
