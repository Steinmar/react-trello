import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './actions';
import * as fromTypes from './types';
import api from 'src/core/api';

function* handleBoardListFetch() {
  try {
    const res = yield call(api, 'get', 'board/list');

    if (res.error) {
      yield put(fromActions.boardListFetchRequestError(res.error));
    } else {
      yield put(fromActions.boardListFetchRequestSuccess(res));
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

function* handleBoardListCreateItemFetch(payload) {
  try {
    const res = yield call(api, 'post', 'board', { name: payload });

    if (res.error) {
      yield put(fromActions.boardListCreateItemRequestError(res.error));
    } else {
      yield put(fromActions.boardListCreateItemRequestSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.boardListCreateItemRequestError(err.stack!));
    } else {
      yield put(
        fromActions.boardListCreateItemRequestError({
          message: 'An unknown error occured.'
        })
      );
    }
  }
}

function* handleBoardListUpdateItemFetch(payload) {
  try {
    const res = yield call(api, 'put', `board/${payload.id}`, payload);

    if (res.error) {
      yield put(fromActions.boardListUpdateItemRequestError(res.error));
    } else {
      yield put(fromActions.boardListUpdateItemRequestSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.boardListUpdateItemRequestError(err.stack!));
    } else {
      yield put(
        fromActions.boardListUpdateItemRequestError({
          message: 'An unknown error occured.'
        })
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

function* watchBoardListCreateItemRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.BoardListStateActionTypes.CREATE_ITEM_REQUEST
    );
    yield call(handleBoardListCreateItemFetch, payload);
  }
}

function* watchBoardListUpdateItemRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.BoardListStateActionTypes.UPDATE_ITEM_REQUEST
    );
    yield call(handleBoardListUpdateItemFetch, payload);
  }
}

function* boardsSaga() {
  yield all([
    fork(watchBoardFetchRequest),
    fork(watchBoardListCreateItemRequest),
    fork(watchBoardListUpdateItemRequest)
  ]);
}

export { boardsSaga };
