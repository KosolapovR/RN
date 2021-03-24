// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import moment from 'moment/moment';

import {Column, PrimaryText, RowSpaceBetween} from 'components/styled';
import DropdownField from 'components/fields/DropdownField';
import Divider from 'components/Divider';
import {allLanguages} from '@cashelec/shared/consts';

type TermsType = {
  createdAt: string,
  id: string,
  key: string,
  langs: Array<string>,
  version: string,
};
function TermsOfUseBlock({terms}: {terms: Array<TermsType>}) {
  const [selectedTermsID, setSelectedTermsID]: [string, Function] = useState(
    '',
  );
  const [selectedTermsLangs, setSelectedTermsLangs]: [
    Array<string>,
    Function,
  ] = useState([]);

  useEffect(() => {
    const selectedTerms: ?TermsType = terms.find(
      (t) => t.id === selectedTermsID,
    );
    if (selectedTerms) {
      const transformedLangs: Array<{key: string, value: string}> = [];
      selectedTerms.langs.forEach((lang) => {
        const transformedLang = allLanguages.find(
          (language) => language.key === lang,
        );
        if (transformedLang) {
          transformedLangs.push(transformedLang.value);
        }
      });
      setSelectedTermsLangs(transformedLangs);
    }
  }, [selectedTermsID]);

  const handleSelectTermsVersion = (id: string) => {
    setSelectedTermsID(id);
  };

  const handleSelectLanguage = (lang) => {
    //API call
  };

  useEffect(() => {}, [selectedTermsLangs, selectedTermsID]);

  return (
    <Column>
      <RowSpaceBetween>
        <DropdownField
          placeholder="дата"
          onSelect={handleSelectTermsVersion}
          dropdownItems={terms.map((t) => ({
            id: t.id,
            element: (
              <PrimaryText>
                {moment(t.createdAt).format('DD.MM.YY')}
              </PrimaryText>
            ),
          }))}
          initialItemId={terms[0].id}
          itemWidth={140}
        />
        <DropdownField
          placeholder="язык"
          dropdownItems={selectedTermsLangs.map((lang) => ({
            id: lang,
            element: <PrimaryText>{lang}</PrimaryText>,
          }))}
          itemWidth={140}
          onSelect={handleSelectLanguage}
          initialItemId={
            selectedTermsLangs.length > 0 ? selectedTermsLangs[0] : ''
          }
        />
      </RowSpaceBetween>
      <Divider black height={3} fullWidth />
    </Column>
  );
}

TermsOfUseBlock.defaultProps = {
  terms: [],
};

export default TermsOfUseBlock;
