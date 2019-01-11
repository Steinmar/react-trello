export interface SignUp {
  name: string;
  email: string;
}

export interface Login {
  name: string;
  email: string;
}

export const enum SignUpStateActionTypes {
  FETCH_REQUEST = '@@signup/FETCH_REQUEST',
  FETCH_SUCCESS = '@@signup/FETCH_SUCCESS',
  FETCH_ERROR = '@@signup/FETCH_ERROR'
}

export const enum LoginStateActionTypes {
  FETCH_REQUEST = '@@login/FETCH_REQUEST',
  FETCH_SUCCESS = '@@login/FETCH_SUCCESS',
  FETCH_ERROR = '@@login/FETCH_ERROR'
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
