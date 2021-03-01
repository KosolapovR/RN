// import i18n from 'i18next';
// // import LanguageDetector from 'i18next-browser-languagedetector';
// import {initReactI18next} from 'react-i18next';
// import HttpApi from 'i18next-http-backend';
// import moment from 'moment';
// import 'moment/min/locales';
//
// import endpoints from '../api/endpoints';
//
// // prod version
// // import endpoints from 'api/endpoints';
// // import { updateResults } from '@digitalwing.co/redux-query-immutable';
// // import store from '../configureStore';
//
// // dev version
//
// // prod version
// // const getTranslate = (lang, translationFetchingStatus) => {
// //   store.dispatch(updateResults({ translationFetchingStatus }));
// //   return fetch(endpoints.getTranslatesUrl(lang))
// //     .then(res => res.json()
// //       .then(resJson => resJson));
// // };
//
// i18n
//   // detect user language
//   // learn more: https://github.com/i18next/i18next-browser-languageDetector
//   .use(HttpApi)
//   // .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     lng: 'ru',
//     fallbackLng: 'ru',
//     preload: ['en', 'ru'],
//     ns: ['translation'],
//     defaultNS: 'translation',
//     backend: {
//       // loadPath: `${endpoints.getTranslationsUrl()}/{{lng}}/{{ns}}.json`,
//       // addPath: `${endpoints.getTranslationsUrl()}/add/{{lng}}/{{ns}}`,
//       loadPath: `localhost/{{lng}}/{{ns}}.json`,
//       addPath: `localhost/add/{{lng}}/{{ns}}`,
//     },
//   });
//
// // prod version
// // getTranslate(i18n.language, 'firstLoad').then((res) => {
// //   i18n.addResourceBundle(i18n.language, 'translation', res);
// // });
// //
// // i18n.store.on('added', (lng) => {
// //   i18n.changeLanguage(lng);
// //   store.dispatch(updateResults({ translationFetchingStatus: '' }));
// // });
//
// // изменяем язык в моменте при изменении языка в i18n и загружаем выбранный язык
// i18n.on('languageChanged', (lng) => {
//   // prod version
//   // if (!i18n.hasResourceBundle(lng, 'translation')) {
//   //   getTranslate(lng, 'changeLang').then((res) => {
//   //     i18n.addResourceBundle(lng, 'translation', res);
//   //   });
//   // }
//   moment.locale(lng);
// });
//
// // устанавливаем язык в моменте при инициализации
// moment.locale(i18n.language);
//
// export default i18n;
