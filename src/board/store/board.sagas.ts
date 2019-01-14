import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './actions';
import * as fromTypes from './types';
import api from 'src/core/api';

function* handleBoardListFetch() {
  try {
    const res = yield call(api, 'get', 'board/list');

    if (res.error) {
      yield put(fromActions.boardListFetchRequestSuccess(res.error));
    } else {
      yield put(fromActions.boardListFetchRequestError(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.boardListFetchRequestError(err.stack!));
    } else {
      yield put(
        fromActions.boardListFetchRequestError('An unknown error occured.')
      );
    }
  }
}

function* watchBoardFetchRequest() {
  while (true) {
    yield take(fromTypes.BoardListStateActionTypes.FETCH_REQUEST);
    yield call(handleBoardListFetch);
  }
}

function* boardsSaga() {
  yield all([fork(watchBoardFetchRequest)]);
}

export { boardsSaga };
