import { getEntities, getResults } from 'reducers';
import { Map, List } from 'immutable';
import { denormalize } from 'normalizr';
import {
  dealComment,
  user,
  userInfo,
  offer,
  ticker,
  notification,
  term,
  userMessage,
  fiatCurrency,
  exchange,
  story,
  news,
  wallet,
  accountPaymentSystem,
  bankCard,
  deal,
  course,
  marketSubscription,
  logItem,
  authHistory,
  transaction,
  FAQTopic,
  article,
  cryptoStat,
  topic,
  topicMessage,
  votes,
  board,
  message,
  session,
} from 'schemas';

import useISESelector from './useISESelector';

export {
  useISESelector,
};

const defaultMap = Map();
const defaultList = List();

const getDenormalizedEntity = (schema, isList = false) => (state, resultKey) =>
  denormalize(
    getResults(state).get(
      resultKey,
      isList ? defaultList : defaultMap,
    ) || (isList ? defaultList : defaultMap),
    schema,
    getEntities(state),
  );

const getSimpleResult = initialValue => (state, resultKey) =>
  getResults(state).get(resultKey, initialValue);

export const mapSelector = getSimpleResult(defaultMap);
export const listSelector = getSimpleResult(defaultList);
export const primitiveSelector = (state, resultKey, initialValue) =>
  getResults(state).get(resultKey, initialValue);
export const entitiesSelector = (state, resultKey) =>
  getEntities(state).get(resultKey, Map());

export const userSelector = getDenormalizedEntity(user.schema);
export const usersSelector = getDenormalizedEntity(user.schemasArray, true);

export const userInfoSelector = getDenormalizedEntity(userInfo.schema);

export const dealCommentsSelector = getDenormalizedEntity(dealComment.schemasArray, true);

export const offersSelector = getDenormalizedEntity(offer.schemasArray, true);
export const offerSelector = getDenormalizedEntity(offer.schema);

export const tickersSelector = getDenormalizedEntity(ticker.schemasArray, true);

export const notificationsSelector = getDenormalizedEntity(notification.schemasArray, true);

export const termsSelector = getDenormalizedEntity(term.schemasArray, true);

export const userMessagesSelector = getDenormalizedEntity(userMessage.schemasArray, true);

export const fiatCurrenciesSelector = getDenormalizedEntity(fiatCurrency.schemasArray, true);

export const exchangesSelector = getDenormalizedEntity(exchange.schemasArray, true);

export const storiesSelector = getDenormalizedEntity(story.schemasArray, true);

export const newsSelector = getDenormalizedEntity(news.schemasArray, true);
export const singleNewsSelector = getDenormalizedEntity(news.schema, true);

export const walletsSelector = getDenormalizedEntity(wallet.schemasArray, true);

export const bankCardsSelector = getDenormalizedEntity(bankCard.schemasArray, true);

export const accountPaymentSystemsSelector = getDenormalizedEntity(
  accountPaymentSystem.schemasArray, true,
);

export const dealsSelector = getDenormalizedEntity(deal.schemasArray, true);
export const dealSelector = getDenormalizedEntity(deal.schema);

export const currencyCoursesSelector = getDenormalizedEntity(course.schemasArray, true);

export const marketSubscriptionsSelector = getDenormalizedEntity(
  marketSubscription.schemasArray, true,
);

export const logHistorySelector = getDenormalizedEntity(logItem.schemaArray, true);

export const authHistorySelector = getDenormalizedEntity(authHistory.schemasArray, true);

export const transactionsSelector = getDenormalizedEntity(transaction.schemasArray, true);

export const FAQTopicsSelector = getDenormalizedEntity(FAQTopic.schemasArray, true);

export const articleSelector = getDenormalizedEntity(article.schema);

export const messagesSelector = getDenormalizedEntity(message.schemasArray, true);

export const cryptoStatsSelector = getDenormalizedEntity(cryptoStat.schema);

export const topicSelector = getDenormalizedEntity(topic.schemaWithMessages);
export const topicsSelector = getDenormalizedEntity(topic.schemasArray, true);

export const boardSelector = getDenormalizedEntity(board.schemaWithTopic);
export const boardsSelector = getDenormalizedEntity(board.schemasArray, true);

export const topicMessageSelector = getDenormalizedEntity(topicMessage.schema);
export const topicMessagesSelector = getDenormalizedEntity(topicMessage.schemasArray, true);

export const votesSelector = getDenormalizedEntity(votes.schemasArray, true);

export const sessionsSelector = getDenormalizedEntity(session.schemasArray, true);
