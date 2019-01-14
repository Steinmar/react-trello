import { AUTH_NAMES } from 'src/auth/CONSTANTS';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'http://localhost:8000/';

export default function api(
  method: string,
  path: string,
  token: string,
  data?: any
) {
  return fetch(BASE_URL + path, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      [AUTH_NAMES.TOKEN_HEADER_NAME]: token
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}
