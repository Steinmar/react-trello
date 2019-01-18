import { put } from 'redux-saga/effects';
import { logoutFetchRequest } from 'src/auth/store/actions';

export function requestErrorHandler(err, errorHandlerAction) {
  if (err instanceof Error) {
    if (err.message === '401') {
      return put(logoutFetchRequest(true));
    } else {
      return put(errorHandlerAction(err.stack!));
    }
  } else {
    return put(errorHandlerAction('An unknown error occured.'));
  }
}

export default requestErrorHandler;
