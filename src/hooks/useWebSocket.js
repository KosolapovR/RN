import { useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { token } from 'helpers';
import endpoints from 'api/endpoints';
import useOnMessageSocket from './useOnMessageSocket';

let ws;

/**
 * Хук для использования webSocket
 *
 * @param location { Object} Обьект, с данными об адресе пользователя
 */
export default (location) => {
  // api hooks
  const { onMessage } = useOnMessageSocket(location);

  useEffect(() => {
    ws = new ReconnectingWebSocket(
      endpoints.getSocketsUrl({ token: token.getToken() }),
      [],
      {
        debug: process.env.NODE_ENV !== 'production',
      },
    );
    ws.onmessage = onMessage;
    ws.onopen = () => ws.send('{"type":"page","payload":"afk"}');
    window.wsObject = ws;
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (!window.isForumPages && window.wsObject) {
      window.wsObject.onmessage = onMessage;
    }
  }, [onMessage]);
};
