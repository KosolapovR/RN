import {useMemo} from 'react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {getStories} from '@cashelec/shared/api/news';
import {getNotifications} from '@cashelec/shared/api/users';

/**
 *
 * @returns {{
 *   getNotifications: Function,
 *   getStories: Function,
 *   getFiatCurrencies: Function,
 * }}
 */
export default () => {
  const dispatch = useDispatch();

  const actions = useMemo(
    () =>
      bindActionCreators(
        {
          getNotifications,
          getStories,
        },
        dispatch,
      ),
    [dispatch],
  );

  return {
    ...actions,
  };
};
