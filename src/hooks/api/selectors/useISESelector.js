import {useSelector} from 'react-redux';
import immutableShallowEqual from './immutableShallowEqual';

// useImmutableShallowEqualSelector
const useISESelector = (selector) =>
  useSelector(selector, immutableShallowEqual);

export default useISESelector;
