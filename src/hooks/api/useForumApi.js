import { useMemo, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { querySelectors } from '@digitalwing.co/redux-query-immutable';
import { useDispatch } from 'react-redux';
import {
  getActiveTopics,
  getBoard,
  getBoards,
  getBoardsTopicAvailable,
  getMessage,
  getMessagesSearch,
  getStatistic,
  getStatisticUser,
  getSubsCount,
  getSubscriptions,
  getTopic,
  getTopicsSearch,
  getVotes,

  postMessage,
  postTopic,

  putMarkAllTopicsAsRead,
  putMessage,
  putSubscription,
  putTopic,
  putVote,
} from 'api/forum';
import endpoints from 'api/endpoints';
import {
  useISESelector,
  listSelector,
  mapSelector,
  primitiveSelector,
  topicSelector,
  topicsSelector,
  topicMessageSelector,
  topicMessagesSelector,
  boardSelector,
  boardsSelector,
  votesSelector,
} from './selectors';

/**
 *
 * @returns {{
 *  boards: Immutable.Map,
 *  board: Immutable.Map,
 *  boardMeta: Immutable.Map,
 *  topic: Immutable.Map,
 *  topicMeta: Immutable.Map,
 *  subscriptions: Immutable.List,
 *  subscriptionsMeta: Immutable.Map,
 *  subsCount: String,
 *  searchTopics: Immutable.List,
 *  searchMessages: Immutable.List,
 *  searchMeta: Immutable.Map,
 *  boardsTopicAvailable: Immutable.List,
 *  activeTopics: Immutable.List,
 *  votes: Immutable.List,
 *  message: Immutable.Map,
 *  statistic: Immutable.Map,
 *  statisticUser: Immutable.Map,
 *  getBoardsIsFetching: Boolean,
 *  getBoardIsFetching: Boolean,
 *  getTopicIsFetching: Boolean,
 *  getSubscriptionsIsFetching: Boolean,
 *  putSubscriptionIsFetching: Boolean,
 *  getActiveTopicsIsFetching: Boolean,
 *  getBoardsTopicAvailableIsFetching: Boolean,
 *  getVotesIsFetching: Boolean,
 *  getSearchIsFetching: Boolean,
 *  getStatisticIsFetching: Boolean,
 *  getStatisticUserIsFetching: Boolean,
 *  getMessageIsFetching: Boolean,
 *  putVoteIsFetching: Boolean,
 *  subsCountIsInitializing: Boolean,
 *  getActiveTopics: Function,
 *  getBoard: Function,
 *  getBoards: Function,
 *  getBoardsTopicAvailable: Function,
 *  getMessage: Function,
 *  getMessagesSearch: Function,
 *  getStatistic: Function,
 *  getStatisticUser: Function,
 *  getSubsCount: Function,
 *  getSubscriptions: Function,
 *  getTopic: Function,
 *  getTopicsSearch: Function,
 *  getVotes: Function,
 *  postMessage: Function,
 *  postTopic: Function,
 *  putMarkAllTopicsAsRead: Function,
 *  putMessage: Function,
 *  putSubscription: Function,
 *  putTopic: Function,
 *  putVote: Function,
 * }}
 */
export default () => {
  const selector = useCallback(state => ({
    boards: boardsSelector(state, 'boards'),
    board: boardSelector(state, 'board'),
    boardMeta: mapSelector(state, 'boardMeta'),
    topic: topicSelector(state, 'topic'),
    topicMeta: mapSelector(state, 'topicMeta'),
    subscriptions: topicsSelector(state, 'subscriptions'),
    subscriptionsMeta: mapSelector(state, 'subscriptionsMeta'),
    subsCount: primitiveSelector(state, 'subsCount', 0),
    searchTopics: topicsSelector(state, 'searchTopics'),
    searchMessages: topicMessagesSelector(state, 'searchMessages'),
    searchMeta: mapSelector(state, 'searchMeta'),
    boardsTopicAvailable: listSelector(state, 'boardsTopicAvailable'),
    activeTopics: topicsSelector(state, 'activeTopics'),
    votes: votesSelector(state, 'votes'),
    message: topicMessageSelector(state, 'topicMessage'),
    statistic: mapSelector(state, 'statistic'),
    statisticUser: mapSelector(state, 'statisticUser'),

    getBoardsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getBoardsUrl() },
    ) || false,
    getBoardIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getBoardUrl() },
    ) || false,
    getTopicIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getTopicByIdUrl() },
    ) || false,
    getSubscriptionsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getSubscriptionUrl() },
    ) || false,
    putSubscriptionIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `put${endpoints.getSubscriptionUrl()}` },
    ) || false,
    getActiveTopicsIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getActiveTopicsUrl() },
    ) || false,
    getBoardsTopicAvailableIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getBoardsTopicAvailableUrl() },
    ) || false,
    getVotesIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getVotesUrl() },
    ) || false,
    getSearchIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getTopicsSearchUrl() },
    ) || querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getMessagesSearchUrl() },
    ) || false,
    getStatisticIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getStatisticUrl() },
    ) || false,
    getStatisticUserIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getStatisticUserUrl() },
    ) || false,
    getMessageIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: endpoints.getMessageByIdUrl() },
    ) || false,
    putVoteIsFetching: querySelectors.isPending(
      state.get('queries'),
      { queryKey: `put${endpoints.getVotesUrl()}` },
    ) || false,
    subsCountIsInitializing: !!querySelectors.lastUpdated(
      state.get('queries'),
      { queryKey: endpoints.getSubsCountUrl() },
    ),
  }), []);

  const data = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(() => bindActionCreators({
    getActiveTopics,
    getBoard,
    getBoards,
    getBoardsTopicAvailable,
    getMessage,
    getMessagesSearch,
    getStatistic,
    getStatisticUser,
    getSubsCount,
    getSubscriptions,
    getTopic,
    getTopicsSearch,
    getVotes,

    postMessage,
    postTopic,

    putMarkAllTopicsAsRead,
    putMessage,
    putSubscription,
    putTopic,
    putVote,
  }, dispatch),
  [dispatch]);

  return {
    ...data,
    ...actions,
  };
};
