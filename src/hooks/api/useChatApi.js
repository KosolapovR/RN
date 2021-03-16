import {useCallback, useEffect, useMemo, useRef} from 'react';
import {bindActionCreators} from 'redux';
import {
  querySelectors,
  updateEntities,
  updateResults,
} from '@digitalwing.co/redux-query-immutable';
import {useDispatch} from 'react-redux';
import {fromJS} from 'immutable';
import {normalize} from 'normalizr';
import _ from 'lodash';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {parseJson, token} from '@cashelec/shared/helpers';
import {message} from '@cashelec/shared/schemas';
import endpoints from '@cashelec/shared/api/endpoints';
import {getAesKey, getMessages, postMessage} from '@cashelec/shared/api/chat';
import {
  entitiesSelector,
  listSelector,
  messagesSelector,
  useISESelector,
} from './selectors';

let ws;
/**
 * @returns {{
 *   messages: Immutable.List,
 *   messagesEntities: Immutable.Map,
 *   messagesResults: Immutable.List,
 *   getMessagesIsFetching: Boolean,
 *   getMessages: Function,
 *   postMessage: Function,
 *   getAesKey: Function,
 *   updateMessagesEntities: Function,
 *   updateMessagesResults: Function,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      messages: messagesSelector(state, 'messages'),
      messagesEntities: entitiesSelector(state, 'message'),
      messagesResults: listSelector(state, 'messages'),
      getMessagesIsFetching:
        querySelectors.isPending(state.get('queries'), {
          queryKey: endpoints.getMessagesUrl(),
        }) || false,
    }),
    [],
  );

  const store = useISESelector(selector);

  const dispatch = useDispatch();

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          getMessages,
          postMessage,
          getAesKey,
          updateMessagesEntities: (messagesEntities) =>
            updateEntities({message: messagesEntities}),
          updateMessagesResults: (messagesResults) =>
            updateResults({messages: messagesResults}),
        },
        dispatch,
      ),
    [dispatch],
  );

  const currentDealId = useRef(null);

  const onMessage = useCallback(
    (e) => {
      // e.data - строка в формате {"type":"new","payload":"{}"}
      const data = JSON.parse(e.data);
      if (
        data.type === 'new' &&
        _.get(data, 'data.channelId', '') === currentDealId.current
      ) {
        const {entities, result} = normalize(
          {
            ...data.data,
            files: data.data.files ? data.data.files.map(parseJson) : [],
          },
          message.schema,
        );
        actions.updateMessagesEntities(
          store.messagesEntities.mergeDeep(fromJS(entities.message)),
        );
        actions.updateMessagesResults(store.messagesResults.push(result));
      }
    },
    [store.messagesEntities, store.messagesResults],
  );

  const startWebsocket = (dealId) => {
    ws = new ReconnectingWebSocket(
      endpoints.getChatSocketUrl({token: token.getToken(), dealID: dealId}),
      [],
      {
        debug: process.env.NODE_ENV !== 'production',
        connectionTimeout: 3000,
        maxReconnectionDelay: 1000,
        maxRetries: 10,
      },
    );

    currentDealId.current = dealId;
    ws.onmessage = onMessage;
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = onMessage;
    }
  }, [onMessage]);

  useEffect(
    () => () => {
      if (ws) {
        ws.close();
      }
    },
    [],
  );

  return {
    ...store,
    ...actions,
    startWebsocket,
  };
};
