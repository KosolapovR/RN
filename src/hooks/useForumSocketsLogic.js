import {useCallback, useEffect, useState} from 'react';
import {usePrevious} from 'react-use';
import {WEBSOCKET_EVENT_TYPES, routes} from 'consts';
import {useUser} from '@cashelec/shared/hooks/api';
import {toast} from 'helpers';
import useOnMessageSocket from './useOnMessageSocket';

/**
 * Хук для использования логики форума
 *
 * @param match {Object} Обьект данными об адресах, определенного пользователя
 * @param location {Object} Обьект, с данными об адресе пользователя
 * @returns {{
 *   canUpdate: Boolean, Параметр стейта, который используется для удаление тоста по его id
 *   setCanUpdate: Function, Функция для изменения стейта
 * }}
 */
export default ({match, location}) => {
  const {isUserAuthorized} = useUser();
  const prevLocation = usePrevious(location);
  const {onMessage} = useOnMessageSocket(location);

  const [canUpdate, setCanUpdate] = useState(false);
  const updateForum = useCallback(
    (e) => {
      const eventData = JSON.parse(e.data);

      // обновление чего-либо на форуме
      if (
        (eventData.type === WEBSOCKET_EVENT_TYPES.FORUM_CHILD_UPDATE ||
          eventData.type === WEBSOCKET_EVENT_TYPES.FORUM_OBJECT_UPDATE) &&
        !canUpdate
      ) {
        setCanUpdate(true);
      }

      onMessage(e);
    },
    [onMessage],
  );

  useEffect(() => {
    if (isUserAuthorized) {
      let currentPage;

      switch (match.path) {
        case routes.getForumBase(): {
          currentPage = 'forum_root';
          break;
        }
        case routes.getForumBoard(): {
          currentPage = `forum_board_${match.params.id}`;
          break;
        }
        case routes.getForumTopic(): {
          currentPage = `forum_topic_${match.params.id}`;
          break;
        }
        default: {
          currentPage = 'afk';
          break;
        }
      }

      const data = `{"type":"page","payload":"${currentPage}"}`;
      if (window.wsObject) {
        window.wsObject.onmessage = updateForum;
        window.wsObject.send(data);
        window.wsObject.onopen = () => window.wsObject.send(data);
        window.isForumPages = true;
      }
    }
  }, [window.wsObject]);
  useEffect(
    () => () => {
      if (window.wsObject) {
        window.wsObject.send('{"type":"page","payload":"afk"}');
        window.wsObject.onopen = () =>
          window.wsObject.send('{"type":"page","payload":"afk"}');
        window.isForumPages = false;
      }
      toast.dismiss('forum-refresh');
    },
    [],
  );

  useEffect(() => {
    if (prevLocation && prevLocation.pathname !== location.pathname) {
      if (canUpdate) {
        toast.dismiss('forum-refresh');
      }
      setCanUpdate(false);
    }
  }, [location]);
  useEffect(() => {
    if (window.wsObject) {
      window.wsObject.onmessage = updateForum;
    }
  }, [updateForum]);

  return {
    canUpdate,
    setCanUpdate,
  };
};
