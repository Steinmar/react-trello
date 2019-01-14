import { BASE_URL } from '../core/api';
import { AUTH_NAMES } from './CONSTANTS';

export default function authApi(method: string, path: string, data?: any) {
  return fetch(BASE_URL + path, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res =>
    res
      .json()
      .then(result => ({
        ...result,
        token: res.headers.get(AUTH_NAMES.TOKEN_HEADER_NAME)
      }))
  );
}
