import {useCallback, useEffect, useState, useMemo} from 'react';
import {useUser, useUserApi} from '@cashelec/shared/hooks/api';
import {usePrevious} from 'react-use';
import {
  useISESelector,
  primitiveSelector,
} from '@cashelec/shared/hooks/api/selectors';

/**
 * Хук для работы с условиями использования логики
 *
 * @param location { Object} Обьект, с данными об адресе пользователя

 * @returns {{
 *   isTermsOpen: Boolean, Параметр со значением стейта
 *   setIsTermsOpen: Function, Функция изменяющая стейт
 * }}
 */
export default ({location}) => {
  const {user} = useUser();
  const {terms} = useUserApi();

  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const latestTermsAccepted = useMemo(() => {
    let accepted = false;
    if (terms.size) {
      const currentAcceptedTermsID = user.get('confirmedTerm');
      if (!currentAcceptedTermsID) {
        return accepted;
      }

      const currentAcceptedTermsVersion = parseFloat(
        terms
          .find((t) => t.get('id') === currentAcceptedTermsID)
          .get('version'),
      );
      let maxTermsVersion = 0;
      terms.forEach((t) => {
        maxTermsVersion =
          parseFloat(t.get('version')) > maxTermsVersion &&
          parseFloat(t.get('version'));
      });
      accepted = maxTermsVersion <= currentAcceptedTermsVersion;
    } else {
      accepted = true;
    }
    return accepted;
  }, [terms]);

  const selector = useCallback(
    (state) => ({
      isTermsAccept: primitiveSelector(state, 'isTermsAccept', true),
    }),
    [],
  );

  const store = useISESelector(selector);

  const prevIsTermsAccept = usePrevious(store.isTermsAccept);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (
      params.get('terms') !== null ||
      (user &&
        !user.get('confirmedTerm') &&
        user.get('confirmedTerm') !== undefined) ||
      !latestTermsAccepted
    ) {
      setIsTermsOpen(true);
    }
  }, [terms]);

  useEffect(() => {
    if (prevIsTermsAccept !== store.isTermsAccept && !store.isTermsAccept) {
      setIsTermsOpen(true);
    }
  }, [store.isTermsAccept]);

  return {
    isTermsOpen,
    setIsTermsOpen,
  };
};
