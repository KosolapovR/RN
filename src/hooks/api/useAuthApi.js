// import {useMemo, useCallback} from 'react';
// import {bindActionCreators} from 'redux';
// import {querySelectors} from '@digitalwing.co/redux-query-immutable';
// import {useDispatch} from 'react-redux';
// import {
//   // postSignUp,
//   // getConfirm,
//   // getConfirmEmail,
//   get2faCodes,
//   // get2faKey,
//   // post2faEnable,
//   // get2faCode,
//   // get2faDisable,
//   // postLogin2fa,
//   // getPasswordRecovery,
//   // postPasswordRecovery,
//   // postPasswordRecovery2fa,
//   // postLogin,
//   // getCheckEmail,
//   // getCheckUsername,
//   // post2faDisable,
//   // postEmail,
//   // postPassword,
//   // getResendEmailConfirm,
// } from 'api/auth';
// import endpoints from 'api/endpoints';
// import {listSelector, primitiveSelector, useISESelector} from './selectors';
//
// /**
//  * @returns {{
//  *   recoveryCodes: Immutable.List,
//  *   key2fa: String,
//  *   twoFaCode: String,
//  *   get2faKeyIsFetching: Boolean,
//  *   get2faCodesIsFetching: Boolean,
//  *   get2faCodeIsFetching: Boolean,
//  *   postSignUp: Function,
//  *   getConfirm: Function,
//  *   getConfirmEmail: Function,
//  *   get2faCodes: Function,
//  *   get2faKey: Function,
//  *   post2faEnable: Function,
//  *   get2faCode: Function,
//  *   get2faDisable: Function,
//  *   postLogin2fa: Function,
//  *   getPasswordRecovery: Function,
//  *   postPasswordRecovery: Function,
//  *   postPasswordRecovery2fa: Function,
//  *   postLogin: Function,
//  *   getCheckEmail: Function,
//  *   getCheckUsername: Function,
//  *   post2faDisable: Function,
//  *   postEmail: Function,
//  *   postPassword: Function,
//  *   getResendEmailConfirm: Function,
//  * }}
//  */
//
// export default () => {
//   const selector = useCallback(
//     (state) => ({
//       recoveryCodes: listSelector(state, 'recoveryCodes'),
//       key2fa: primitiveSelector(state, 'key2fa', ''),
//       key2faShort: primitiveSelector(state, 'key2faShort', ''),
//       twoFaCode: primitiveSelector(state, 'twoFaCode', ''),
//       // get2faKeyIsFetching:
//       //   querySelectors.isPending(state.get('queries'), {
//       //     queryKey: endpoints.get2faKeyUrl(),
//       //   }) || false,
//       // get2faKeyIsFinish:
//       //   querySelectors.isFinished(state.get('queries'), {
//       //     queryKey: endpoints.get2faKeyUrl(),
//       //   }) || false,
//       // get2faCodesIsFetching:
//       //   querySelectors.isPending(state.get('queries'), {
//       //     queryKey: endpoints.get2faCodesUrl(),
//       //   }) || false,
//       // get2faCodesIsFinish:
//       //   querySelectors.isFinished(state.get('queries'), {
//       //     queryKey: endpoints.get2faCodesUrl(),
//       //   }) || false,
//       // get2faCodeIsFetching: querySelectors.isPending(state.get('queries'), {
//       //   queryKey: endpoints.get2faCodeUrl(),
//       // }),
//     }),
//     [],
//   );
//
//   const data = useISESelector(selector);
//
//   const dispatch = useDispatch();
//
//   const actions = useMemo(
//     () =>
//       bindActionCreators(
//         {
//           // postSignUp,
//           // getConfirm,
//           // getConfirmEmail,
//           get2faCodes,
//           // get2faKey,
//           // post2faEnable,
//           // get2faCode,
//           // get2faDisable,
//           // postLogin2fa,
//           // getPasswordRecovery,
//           // postPasswordRecovery,
//           // postPasswordRecovery2fa,
//           // postLogin,
//           // getCheckEmail,
//           // getCheckUsername,
//           // post2faDisable,
//           // postEmail,
//           // postPassword,
//           // getResendEmailConfirm,
//         },
//         dispatch,
//       ),
//     [dispatch],
//   );
//
//   return {
//     ...data,
//     ...actions,
//   };
// };
