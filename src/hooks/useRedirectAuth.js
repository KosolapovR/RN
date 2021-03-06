import { useEffect } from 'react';
import _ from 'lodash';
import { routes } from 'consts';

export default ({ location, history, redirectCondition = !_.get(location, 'state.fromAuthorization', false) }) => {
  useEffect(() => {
    if (redirectCondition) {
      history.push(routes.getAuthBase());
    }
  }, []);
};
