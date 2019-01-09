import { action } from 'src/core/ReduxUtils';
import { SignUpStateActionTypes, LoginStateActionTypes } from './types';

export const signInFetchRequest = data =>
  action(SignUpStateActionTypes.FETCH_REQUEST, data);
export const signInFetchRequestSuccess = data =>
  action(SignUpStateActionTypes.FETCH_SUCCESS, data);
export const signInFetchRequestError = data =>
  action(SignUpStateActionTypes.FETCH_ERROR, data);

export const loginFetchRequest = data =>
  action(LoginStateActionTypes.FETCH_REQUEST, data);
export const loginFetchRequestSuccess = data =>
  action(LoginStateActionTypes.FETCH_SUCCESS, data);
export const loginFetchRequestError = data =>
  action(LoginStateActionTypes.FETCH_ERROR, data);
