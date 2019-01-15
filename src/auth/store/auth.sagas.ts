import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './actions';
import * as fromTypes from './types';
import authApi from '../auth.api';
import AuthTokenManager from 'src/core/AuthTokenManager';

function* handleSignUpFetch(params) {
  try {
    const res = yield call(authApi, 'post', 'sign-up', params);

    if (res.error) {
      yield put(fromActions.signInFetchRequestError(res.error));
    } else {
      yield put(fromActions.signInFetchRequestSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.signInFetchRequestError(err.stack!));
    } else {
      yield put(
        fromActions.signInFetchRequestError({
          error: 'An unknown error occured.'
        })
      );
    }
  }
}

function* watchSighUpFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.SignUpStateActionTypes.FETCH_REQUEST
    );

    yield call(handleSignUpFetch, payload);
  }
}

function* handleLoginFetch(params) {
  try {
    const res = yield call(authApi, 'post', 'login', params);

    if (res.error) {
      yield put(fromActions.loginFetchRequestError(res.error));
    } else {
      yield put(fromActions.loginFetchRequestSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.loginFetchRequestError(err.stack!));
    } else {
      yield put(
        fromActions.loginFetchRequestError({
          error: 'An unknown error occured.'
        })
      );
    }
  }
}

function* watchLoginFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.LoginStateActionTypes.FETCH_LOGIN_REQUEST
    );

    yield call(handleLoginFetch, payload);
  }
}

function* handleLoginFetchSuccess(payload) {
  AuthTokenManager.setToken(payload.token);
}

function* watchLoginFetchSuccessRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.LoginStateActionTypes.FETCH_LOGIN_SUCCESS
    );

    yield call(handleLoginFetchSuccess, payload);
  }
}

function* handleLogoutFetch() {
  try {
    const res = yield call(authApi, 'post', 'logout');

    if (res.error) {
      yield put(fromActions.logoutFetchRequestError(res.error));
    } else {
      yield put(fromActions.logoutFetchRequestSuccess());
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.logoutFetchRequestError(err.stack!));
    } else {
      yield put(
        fromActions.logoutFetchRequestError('An unknown error occured.')
      );
    }
  }
}

function* watchLogoutFetchRequest() {
  while (true) {
    yield take(fromTypes.LoginStateActionTypes.FETCH_LOGOUT_REQUEST);
    yield call(handleLogoutFetch);
  }
}

function* handleLogoutFetchSuccess() {
  AuthTokenManager.removeToken();
}

function* watchLogoutFetchSuccessRequest() {
  while (true) {
    yield take(fromTypes.LoginStateActionTypes.FETCH_LOGOUT_SUCCESS);
    yield call(handleLogoutFetchSuccess);
  }
}

function* authSaga() {
  yield all([
    fork(watchSighUpFetchRequest),
    fork(watchLoginFetchRequest),
    fork(watchLoginFetchSuccessRequest),
    fork(watchLogoutFetchRequest),
    fork(watchLogoutFetchSuccessRequest)
  ]);
}

export { authSaga };
