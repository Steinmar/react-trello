export interface SignUp {
  name: string;
  email: string;
  redirectToLogin: boolean;
}

export interface Login {
  name: string;
  email: string;
  showSignUpSuccessMessage: boolean;
  sessionExpired?: boolean;
  token?: string;
}

export const enum SignUpStateActionTypes {
  FETCH_REQUEST = '@@signup/FETCH_REQUEST',
  FETCH_SUCCESS = '@@signup/FETCH_SUCCESS',
  FETCH_ERROR = '@@signup/FETCH_ERROR',
  CLEAR_REDIRECT_FLAG = '@@signup/CLEAR_REDIRECT_FLAG',
  CLEAR_DATA = '@@signup/CLEAR_DATA'
}

export const enum LoginStateActionTypes {
  FETCH_LOGIN_REQUEST = '@@login/FETCH_LOGIN_REQUEST',
  FETCH_LOGIN_SUCCESS = '@@login/FETCH_LOGIN_SUCCESS',
  FETCH_LOGIN_ERROR = '@@login/FETCH_LOGIN_ERROR',
  FETCH_LOGOUT_REQUEST = '@@login/FETCH_LOGOUT_REQUEST',
  FETCH_LOGOUT_SUCCESS = '@@login/FETCH_LOGOUT_SUCCESS',
  FETCH_LOGOUT_ERROR = '@@login/FETCH_LOGOUT_ERROR',
  SHOW_SIGN_UP_SUCCESS_MESSAGE = '@@login/SHOW_SIGN_UP_SUCCESS_MESSAGE',
  TRIGGER_SIGN_UP_SUCCESS_MESSAGE = '@@login/TRIGGER_SIGN_UP_SUCCESS_MESSAGE',
  HIDE_SIGN_UP_SUCCESS_MESSAGE = '@@login/HIDE_SIGN_UP_SUCCESS_MESSAGE'
}

export interface SignUpState {
  readonly loading: boolean;
  readonly data: SignUp;
  readonly error: string | null;
}

export interface LoginState {
  readonly loading: boolean;
  readonly data: Login;
  readonly error: string | null;
}
