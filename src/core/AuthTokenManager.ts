import { AUTH_NAMES } from '../auth/CONSTANTS';

class AuthManager {
  public static setAuthData(payload) {
    localStorage.setItem(AUTH_NAMES.LOCAL_DATA, JSON.stringify(payload));
  }

  public static getToken(): string {
    const localData = AuthManager.getAuthData();
    return localData ? localData.token : '';
  }

  public static getAuthData() {
    const stringifiedData = localStorage.getItem(AUTH_NAMES.LOCAL_DATA);
    return stringifiedData ? JSON.parse(stringifiedData) : null;
  }

  public static clear() {
    localStorage.removeItem(AUTH_NAMES.LOCAL_DATA);
  }
}

export default AuthManager;
