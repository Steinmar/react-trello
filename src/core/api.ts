const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/'
    : 'http://localhost:8000/';

export default function api(method: string, path: string, data?: any) {
  return fetch(BASE_URL + path, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}
