import {normalize} from 'normalizr';
import {fiatCurrency} from 'schemas';
import endpoints from '../endpoints';

export default () => ({
  url: endpoints.getFiatCurrenciesUrl(),
  queryKey: endpoints.getFiatCurrenciesUrl(),
  transform: ({data}) => normalize(data, fiatCurrency.schemasArray).entities,
  transformResult: ({data}) => ({
    fiatCurrencies: normalize(data, fiatCurrency.schemasArray).result,
  }),
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'GET',
  },
  update: {
    fiatCurrency: (_, newCurrenciesList) => newCurrenciesList,
  },
  updateResult: {
    fiatCurrencies: (_, newCurrencyResult) => newCurrencyResult,
  },
});
