import endpoints from 'api/endpoints';

/**
 *
 * @param email {String}
 * @param successCallback {Function}
 */
export default ({successCallback, email}) =>
  requestAsync({
    url: endpoints.getResendEmailUrl({email}),
    queryKey: endpoints.getResendEmailUrl(),
    meta: {
      authToken: true,
      errorKey: 'RESEND_EMAIL',
      successCallback,
    },
    options: {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    },
  });
