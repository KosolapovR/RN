import {useMemo, useCallback} from 'react';
import {bindActionCreators} from 'redux';
import {querySelectors} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {
  getArticle,
  getArticleSearch,
  getTopics,
} from '@cashelec/shared/api/faq';
import endpoints from '@cashelec/shared/api/endpoints';
import {
  useISESelector,
  listSelector,
  FAQTopicsSelector,
  articleSelector,
} from './selectors';

/**
 *
 * @returns {{
 *   topics: Immutable.List,
 *   article: Immutable.Map,
 *   faqSearchResults: Boolean,
 *   topicsIsFetching: Boolean,
 *   articleIsFetching: Boolean,
 *   faqSearchIsFetching: Boolean,
 *   getArticle: Function,
 *   getArticleSearch: Function,
 *   getTopics: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      topics: FAQTopicsSelector(state, 'topicsFaq'),
      article: articleSelector(state, 'article'),
      faqSearchResults: listSelector(state, 'faqSearchResults'),

      topicsIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getFaqTopicsUrl(),
        }) || false,
      articleIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getArticleUrl(),
        }) || false,
      faqSearchIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getFaqSearchUrl(),
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
          getArticle,
          getArticleSearch,
          getTopics,
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
