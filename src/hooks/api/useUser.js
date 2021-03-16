import {useMemo, useCallback} from 'react';

import {useISESelector, userSelector} from './selectors';

// Простой хук для получения юзера, который не стоит усложнять без повода
/**
 *
 * @returns {{
 *   isUserAuthorized: Boolean,
 * }}
 */
export default () => {
  const selector = useCallback(
    (state) => ({
      user: userSelector(state, 'user'),
    }),
    [],
  );

  const data = useISESelector(selector);

  const isUserAuthorized = useMemo(() => data.user && !!data.user.size, [
    data.user,
  ]);

  return {
    ...data,
    isUserAuthorized,
  };
};
