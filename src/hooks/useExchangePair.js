import { useState, useEffect } from 'react';
import {
  round,
  cropNumberToN,
  getResourceInfoByOptions,
  getDigits,
  getFiatDigits,
  // convertByCourseWithMinValue,
  getThousandthNormalize,
  getThousandthFormat,
  getRateForBuyer,
} from '@cashelec/shared/helpers';
import _ from 'lodash';
import { usePrevious } from 'react-use';
import Immutable from 'immutable';
import { useTranslation } from 'react-i18next';

const allResources = [];

/**
 * Хук для работы с обменом пар
 *
 * @param getEmpoExchangeRate {Function}
 * @param getTickers {Function} ПОлучить тикеры по прееаной паре
 * @param resources {Object} Обьект с ресурсами
 * @param popularPair {Object} Обьект с информацией о популярных парах
 * @param marketPairs {Object} Обьект с парами на маркете
 * @param initialPair {Object} Обьект с данными начальных пар
 * @param isLoading {Boolean} Параметр, который отвечает за отображение Лоадера
 * @param fiatCurrencies {Object} Список фиатных валют
 *
 * @return currencyFromValue {String} Валюта от стоимости
 * @return currencyToValue {String} Валюта к стоимости
 * @return sellList {Array} Список продаж
 * @return buyList {Array} Список покупок
 * @return minWarning {String} Минимальное предупреждение
 * @return aliasFrom {String} Имя того что мы меняем
 * @return aliasTo {String}  Имя того на что мы меняем
 * @return exchanges {Array} Массив с обменами
 * @return offer {Object} Обьект с предложениями
 * @return swapFieldsValues {Function} Функция которая меняет местами содержимое филдов
 * @return onChangeCurrencyValue {Function} Функция которая изменяет стоимость валюты
 * @return onChangeFromAlias {Function} Вызывается при изменении валюты в первом дропдауне,
 *          создает массив из пар, собирает значение для второго дропдауна
 * @return onChangeToAlias {Function} Собирает значение для первого дропдауна
 * @return mirrorIsExist {Function} Функция для проверки существует ли зеркальная пара
 * @return getTooltipText {Function} Функция для получения текста тултипа
 * @return getMostPopularPair {Function} Функция для получения самой популярной пары
 */

const useExchangePair = ({
                           getEmpoExchangeRate,
                           getTickers,
                           resources,
                           popularPair,
                           marketPairs,
                           initialPair,
                           fiatCurrencies,
                           isLoading,
                         }) => {
  const { t } = useTranslation();

  // const
  const [currencyFromValue, setCurrencyFromValue] = useState('');
  const [currencyToValue, setCurrencyToValue] = useState('');
  const [sellList, setSellList] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [offer, setOffer] = useState({});
  const [aliasFrom, setAliasFrom] = useState('');
  const [aliasTo, setAliasTo] = useState('');
  const [limits, setLimits] = useState({});
  const [minWarning, setMinWarning] = useState('');
  const [exchanges, setExchanges] = useState([]);
  const prevAliases = usePrevious({ aliasFrom, aliasTo });
  const prevInitialPair = usePrevious(initialPair);

  const aliasIsFiat = (selectedAlias) => {
    const [leftAlias, rightAlias] = selectedAlias.split('/');

    return leftAlias !== rightAlias;
  };
  const getExchangeRate = async (_aliasFrom, _aliasTo) => {
    if (_aliasFrom && _aliasTo) {
      const [aliasSell, currencySell] = _aliasFrom.split('/');
      const [aliasBuy, currencyBuy] = _aliasTo.split('/');
      const digitsTo = getDigits(currencyBuy);

      let resOffer = {};
      let offerModify = {};
      let rate = null;

      if (marketPairs.find(pair => pair.get('buyCurrencyAlias').toLowerCase() === currencySell
        && pair.get('buyWalletAlias').toLowerCase() === aliasSell
        && pair.get('sellCurrencyAlias').toLowerCase() === currencyBuy
        && pair.get('sellWalletAlias').toLowerCase() === aliasBuy)) {
        resOffer = await getEmpoExchangeRate({
          queryParams: {
            sellCurrencyAlias: currencyBuy,
            buyCurrencyAlias: currencySell,
            sellWalletAlias: aliasBuy,
            buyWalletAlias: aliasSell,
          },
        });
        offerModify = _.get(resOffer, 'body.data');
        rate = getRateForBuyer(Immutable.fromJS(offerModify)).realRateWithoutCommission;
        offerModify.rate = rate;

        setOffer(offerModify);
      }

      // получаем курсы других бирж и сохраняем только те, которые менее выгодные, чем наш
      getTickers({ symbol: `${currencySell}_${currencyBuy}` })
        .then((tickersRes) => {
          const tickers = _.get(tickersRes, 'body.data');

          if (tickers) {
            if (!rate) {
              const ask = tickers[0] ? tickers[0].rate : 0;
              setOffer({
                rate: cropNumberToN(ask, digitsTo, false),
                profitPercent: 0,
                buyServiceCommission: 0,
              });
            }

            setCurrencyFromValue('');
            setCurrencyToValue('');

            if (typeof tickers.filter === 'function') {
              setExchanges(tickers.filter(ticker =>
                (+ticker.rate < 1 / rate)).reduce((acc, item) => {
                let digits = digitsTo;
                if (+cropNumberToN(item.rate, digitsTo, false) === 0) {
                  digits = getFiatDigits(item.rate);
                }
                if (acc.length < 4) {
                  acc.push({
                    exchange: item.exchange.toUpperCase(),
                    ask: cropNumberToN(item.rate, digits),
                  });
                }
                return acc;
              }, []));
            } else {
              setExchanges(tickers);
            }
          }
        });

      // если пара крипта-крипта
      if (!aliasIsFiat(_aliasFrom) && !aliasIsFiat(_aliasTo)) {
        const currencyFromInfo = getResourceInfoByOptions(
          resources, { searchKey: 'alias', searchValue: aliasSell, typeResource: 'cryptocurrencies' },
        );
        const currencyToInfo = getResourceInfoByOptions(
          resources, { searchKey: 'alias', searchValue: aliasBuy, typeResource: 'cryptocurrencies' },
        );
        let currencyFromLimits = {};
        let currencyToLimits = {};

        if (currencyFromInfo && currencyToInfo) {
          const currencyFromLimitsInfo = currencyFromInfo.get('limits', []).find(limit => limit.get('type') === 'crypto');
          if (currencyFromLimitsInfo) {
            currencyFromLimits = {
              min: currencyFromLimitsInfo.get('min'),
              max: currencyFromLimitsInfo.get('max'),
            };
          }

          const currencyToLimitsInfo = currencyToInfo.get('limits', []).find(limit => limit.get('type') === 'crypto');
          if (currencyToLimitsInfo) {
            currencyToLimits = {
              min: currencyToLimitsInfo.get('min'),
              max: currencyToLimitsInfo.get('max'),
            };
          }
          const minLimitsArray = [currencyFromLimits.min, round(currencyToLimits.min / rate, currencyToInfo.get('digits'), false)];
          const maxLimitsArray = [currencyToLimits.max, round(currencyToLimits.max * rate, currencyToInfo.get('digits'), false)];

          setLimits({
            min: Math.max(...minLimitsArray),
            max: Math.min(...maxLimitsArray),
          });
        }
      } else { // если пара фиат-крипта/крипта-фиат
        let currencyInfo = null;
        let pairLimits = {};

        if (aliasIsFiat(_aliasFrom)) {
          currencyInfo = getResourceInfoByOptions(
            resources, { searchKey: 'alias', searchValue: currencyBuy, typeResource: 'cryptocurrencies' },
          );
        } else {
          currencyInfo = getResourceInfoByOptions(
            resources, { searchKey: 'alias', searchValue: currencySell, typeResource: 'cryptocurrencies' },
          );
        }

        if (currencyInfo) {
          const limitsInfo = currencyInfo.get('limits', []).find(limit => limit.get('type') === 'fiat');

          if (limitsInfo) {
            if (aliasIsFiat(_aliasFrom)) {
              const min = limitsInfo.get('min') * rate;
              const max = limitsInfo.get('max') * rate;

              pairLimits = {
                min: round(min, min < 0.01 ? 6 : 2, false),
                max: round(max, 2, false),
              };
            } else {
              pairLimits = {
                min: limitsInfo.get('min'),
                max: limitsInfo.get('max'),
              };
            }
            setLimits(pairLimits);
          }
        }
      }

      if (prevAliases && prevAliases.aliasFrom !== _aliasTo && prevAliases.aliasTo !== _aliasFrom) {
        setCurrencyToValue('');
        setCurrencyFromValue('');
      }
    }
  };
  const getMostPopularPair = (isFromAlias = false, pair = popularPair) => {
    if (isFromAlias) {
      return `${pair.get('buyWalletAlias', 'btc')}/${pair.get('buyCurrencyAlias', 'btc')}`.toLowerCase();
    }
    return `${pair.get('sellWalletAlias', 'sberbank')}/${pair.get('sellCurrencyAlias', 'usd')}`.toLowerCase();
  };
  const onChangeCurrencyValue = (value, isFromValue = false) => {
    const digitsFrom = getDigits(aliasFrom.split('/')[1]);
    const digitsTo = getDigits(aliasTo.split('/')[1]);

    const newValue = getThousandthNormalize(value);

    if (newValue && offer) {
      if (isFromValue) {
        setCurrencyFromValue(getThousandthFormat(newValue));
        setCurrencyToValue(
            offer.isDirectionInverted
          ? cropNumberToN(newValue * offer.rate, digitsTo)
          : cropNumberToN(newValue / (offer.rate), digitsTo),
        );

        if (newValue < limits.min) {
          setMinWarning(t('LANDING.EXCHANGE_PAIR.MIN_SUM', {
            sum: limits.min,
            alias: aliasFrom.split('/')[1].toUpperCase(),
          }));
        } else if (minWarning) {
          setMinWarning('');
        }
      } else {
        const fromValue = offer.isDirectionInverted
            ? cropNumberToN(newValue / offer.rate, digitsFrom)
            : cropNumberToN(newValue * offer.rate, digitsFrom);

        setCurrencyToValue(getThousandthFormat(newValue));
        setCurrencyFromValue(getThousandthFormat(fromValue));

        if (fromValue < limits.min) {
          setMinWarning(t('LANDING.EXCHANGE_PAIR.MIN_SUM', {
            sum: limits.min,
            alias: aliasFrom.split('/')[1].toUpperCase(),
          }));
        } else if (minWarning) {
          setMinWarning('');
        }
      }
    } else {
      setCurrencyToValue('');
      setCurrencyFromValue('');
    }
  };
  const onChangeFromAlias = (value, toValue) => {
    if (!prevAliases || (prevAliases.aliasFrom !== value)) {
      if (sellList.find(item => item.id === value)) {
        const futureBuyList = allResources.filter(resource =>
          marketPairs.find(pair =>
            resource.id === `${pair.get('sellWalletAlias')}/${pair.get('sellCurrencyAlias')}`.toLowerCase()
            && value === `${pair.get('buyWalletAlias')}/${pair.get('buyCurrencyAlias')}`.toLowerCase()));
        setBuyList(futureBuyList);
        setLimits({});
        setMinWarning('');
        setAliasFrom(value);

        const prevAliasToExistInFutureBuyList = futureBuyList.find(
          resource => resource.id === prevAliases.aliasTo,
        );

        if (prevAliasToExistInFutureBuyList) {
          setAliasTo(toValue || prevAliasToExistInFutureBuyList.id || futureBuyList[0].id);
          getExchangeRate(
            value,
            toValue
            || prevAliasToExistInFutureBuyList.id
            || futureBuyList[0].id,
          );
        } else {
          setAliasTo(toValue || futureBuyList[0].id);
          getExchangeRate(
            value,
            toValue
            || futureBuyList[0].id,
          );
        }
      }
    }
  };
  const onChangeToAlias = (value) => {
    if (prevAliases.aliasTo !== value) {
      setLimits({});
      setMinWarning('');
      setAliasTo(value);
      getExchangeRate(aliasFrom, value);
    }
  };
  const mirrorIsExist = () => {
    if (aliasFrom && aliasTo) {
      const sendAlias = aliasFrom.split('/')[0].toUpperCase();
      const receiveAlias = aliasTo.split('/')[0].toUpperCase();
      const currencyFrom = aliasFrom.split('/')[1].toUpperCase();
      const currencyTo = aliasTo.split('/')[1].toUpperCase();

      return !!marketPairs.find(pair => pair.get('buyWalletAlias') === receiveAlias && pair.get('buyCurrencyAlias') === currencyTo
        && pair.get('sellWalletAlias') === sendAlias && pair.get('sellCurrencyAlias') === currencyFrom);
    }

    return false;
  };
  const getTooltipText = () => {
    if (aliasFrom && aliasTo) {
      return t('LANDING.EXCHANGE_PAIR.MIRROR_NOT_EXIST', {
        from: aliasIsFiat(aliasTo)
          ? `${aliasTo.split('/')[0].toUpperCase()} (${aliasTo.split('/')[1].toUpperCase()})`
          : aliasTo.split('/')[0].toUpperCase(),
        to: aliasIsFiat(aliasFrom)
          ? `${aliasFrom.split('/')[0].toUpperCase()} (${aliasFrom.split('/')[1].toUpperCase()})`
          : aliasFrom.split('/')[0].toUpperCase(),
      });
    }

    return '';
  };
  const swapFieldsValues = () => {
    setLimits({});
    setMinWarning('');
    onChangeFromAlias(aliasTo, aliasFrom);
  };

  // hooks
  useEffect(() => {
    if (!allResources.length) {
      resources.cryptocurrencies.forEach((crypto) => {
        allResources.push({
          id: `${crypto.get('alias')}/${crypto.get('alias')}`,
          fullName: crypto.get('fullName'),
          shortName: crypto.get('alias').toUpperCase(),
          icon: crypto.get('icon'),
        });
      });

      resources.banks.forEach((bank) => {
        fiatCurrencies.forEach((fiat) => {
          allResources.push({
            id: `${bank.get('alias')}/${fiat.get('alias')}`,
            fullName: bank.get('fullName'),
            shortName: fiat.get('shortName'),
            icon: bank.get('icon'),
            countries: bank.get('countries'),
          });
        });
      });

      resources.paymentSystems.forEach((ps) => {
        fiatCurrencies.forEach((fiat) => {
          allResources.push({
            id: `${ps.get('alias')}/${fiat.get('alias')}`,
            fullName: ps.get('fullName'),
            shortName: fiat.get('shortName'),
            icon: ps.get('icon'),
            countries: ps.get('countries'),
            isPaymentSystem: true,
          });
        });
      });
    }
  }, [resources, allResources]);

  const pairExist = (currencyFrom, walletSell, currencyTo, walletBuy, fromList, toList) =>
    !!(fromList.find(item => item.id === `${walletBuy}/${currencyTo}`.toLowerCase())
      && toList.find(item => item.id === `${walletSell}/${currencyFrom}`.toLowerCase()));

  useEffect(() => {
    // проверки для того, чтоб задать начальное значение только после того, как появятся ресурсы
    if (resources.cryptocurrencies.size && (!aliasFrom || !aliasTo) && marketPairs.size) {
      const {
        sellCurrencyAlias,
        buyCurrencyAlias,
        buyWalletAlias,
        sellWalletAlias,
      } = initialPair || {};
      const futureSellList = allResources.filter(resource =>
        marketPairs.find(pair => resource.id === `${pair.get('buyWalletAlias')}/${pair.get('buyCurrencyAlias')}`.toLowerCase()));
      let futureBuyList = [];

      if (buyWalletAlias && buyCurrencyAlias) {
        futureBuyList = allResources.filter(resource =>
          marketPairs.find(pair =>
            resource.id === `${pair.get('sellWalletAlias')}/${pair.get('sellCurrencyAlias')}`.toLowerCase()
            && `${buyWalletAlias}/${buyCurrencyAlias}`.toLowerCase() === `${pair.get('buyWalletAlias')}/${pair.get('buyCurrencyAlias')}`.toLowerCase()));
      } else {
        futureBuyList = allResources.filter(resource =>
          marketPairs.find(pair =>
            resource.id === `${pair.get('sellWalletAlias')}/${pair.get('sellCurrencyAlias')}`.toLowerCase()
            && getMostPopularPair(true) === `${pair.get('buyWalletAlias')}/${pair.get('buyCurrencyAlias')}`.toLowerCase()));
      }

      if (sellCurrencyAlias && buyCurrencyAlias && buyWalletAlias && sellWalletAlias
        && pairExist(
          sellCurrencyAlias,
          sellWalletAlias,
          buyCurrencyAlias,
          buyWalletAlias,
          futureSellList,
          futureBuyList,
        )) {
        if (sellWalletAlias && buyWalletAlias) {
          const directionPair = Immutable.fromJS({
            buyCurrencyAlias,
            sellCurrencyAlias,
            buyWalletAlias,
            sellWalletAlias,
          });

          setAliasFrom(getMostPopularPair(true, directionPair));
          setAliasTo(getMostPopularPair(false, directionPair));
          getExchangeRate(
            getMostPopularPair(true, directionPair), getMostPopularPair(false, directionPair),
          );
        }
      } else if (sellCurrencyAlias && sellWalletAlias
        && futureSellList.find(item => item.id === `${sellWalletAlias}/${sellCurrencyAlias}`.toLowerCase())) {
        onChangeFromAlias(`${sellWalletAlias}/${sellCurrencyAlias}`.toLowerCase());
      } else if (popularPair.size) {
        setAliasFrom(getMostPopularPair(true));
        setAliasTo(getMostPopularPair());
        getExchangeRate(getMostPopularPair(true), getMostPopularPair());
      }

      setSellList(futureSellList);
      setBuyList(futureBuyList);
    }
  }, [isLoading, allResources, marketPairs, resources, popularPair, initialPair]);

  // для обновление списка валют покупки путем обновления адресной строки
  useEffect(() => {
    if (!_.isEqual(prevInitialPair, initialPair) && initialPair) {
      const {
        buyCurrencyAlias,
        buyWalletAlias,
      } = initialPair;

      setBuyList(
        allResources.filter(resource =>
          marketPairs.find(pair =>
            resource.id === `${pair.get('sellWalletAlias')}/${pair.get('sellCurrencyAlias')}`.toLowerCase()
            && `${buyWalletAlias}/${buyCurrencyAlias}`.toLowerCase() === `${pair.get('buyWalletAlias')}/${pair.get('buyCurrencyAlias')}`.toLowerCase())),
      );
    }
  }, [initialPair]);

  return {
    currencyFromValue,
    currencyToValue,
    sellList,
    buyList,
    minWarning,
    aliasFrom,
    aliasTo,
    exchanges,
    offer,
    isCourseSwapped: offer.isDirectionInverted,
    swapFieldsValues,
    onChangeCurrencyValue,
    onChangeFromAlias,
    onChangeToAlias,
    mirrorIsExist,
    getTooltipText,
    getMostPopularPair,
  };
};

export default useExchangePair;
