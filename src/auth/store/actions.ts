import { action } from 'src/core/ReduxUtils';
import { SignUpStateActionTypes, LoginStateActionTypes } from './types';

export const signInFetchRequest = data =>
  action(SignUpStateActionTypes.FETCH_REQUEST, data);
export const signInFetchRequestSuccess = data =>
  action(SignUpStateActionTypes.FETCH_SUCCESS, data);
export const signInFetchRequestError = data =>
  action(SignUpStateActionTypes.FETCH_ERROR, data);

export const loginFetchRequest = data =>
  action(LoginStateActionTypes.FETCH_LOGIN_REQUEST, data);
export const loginFetchRequestSuccess = data =>
  action(LoginStateActionTypes.FETCH_LOGIN_SUCCESS, data);
export const loginFetchRequestError = data =>
  action(LoginStateActionTypes.FETCH_LOGIN_ERROR, data);
export const loginShowSignUpMessage = () =>
  action(LoginStateActionTypes.SHOW_SIGN_UP_SUCCESS_MESSAGE);

export const logoutFetchRequest = (wasSessionExpired = false) =>
  action(LoginStateActionTypes.FETCH_LOGOUT_REQUEST, wasSessionExpired);
export const logoutFetchRequestSuccess = () =>
  action(LoginStateActionTypes.FETCH_LOGOUT_SUCCESS);
export const logoutFetchRequestError = data =>
  action(LoginStateActionTypes.FETCH_LOGOUT_ERROR, data);
