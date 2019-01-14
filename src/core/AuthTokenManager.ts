import { AUTH_NAMES } from '../auth/CONSTANTS';

class AuthTokenManager {
  public static setToken(token: string) {
    localStorage.setItem(AUTH_NAMES.TOKEN_LOCAL_NAME, token);
  }

  public static getToken(): string {
    const token = localStorage.getItem(AUTH_NAMES.TOKEN_LOCAL_NAME);
    return token || '';
  }

  public static removeToken() {
    localStorage.removeItem(AUTH_NAMES.TOKEN_LOCAL_NAME);
  }
}

export default AuthTokenManager;
