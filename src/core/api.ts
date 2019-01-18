import { AUTH_NAMES } from 'src/auth/CONSTANTS';
import AuthManager from './AuthTokenManager';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'http://localhost:8000/';

export default function api(method: string, path: string, data?: any) {
  return fetch(BASE_URL + path, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [AUTH_NAMES.TOKEN_HEADER_NAME]: AuthManager.getToken()
    },
    body: JSON.stringify(data)
  }).then(
    res => {
      if (res.status === 401) {
        throw new Error('401');
      }
      return res.json();
    },
    error => error
  );
}
