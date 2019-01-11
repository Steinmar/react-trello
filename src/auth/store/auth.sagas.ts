import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './actions';
import * as fromTypes from './types';
import api from 'src/core/api';

function* handleSignUpFetch(params) {
  try {
    const res = yield call(api, 'post', 'sign-up', params);

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
        fromActions.signInFetchRequestError('An unknown error occured.')
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
    const res = yield call(api, 'post', 'login', params);

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
        fromActions.loginFetchRequestSuccess('An unknown error occured.')
      );
    }
  }
}

function* watchLoginFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.LoginStateActionTypes.FETCH_REQUEST
    );

    yield call(handleLoginFetch, payload);
  }
}

function* authSaga() {
  yield all([fork(watchSighUpFetchRequest), fork(watchLoginFetchRequest)]);
}

export default authSaga;
