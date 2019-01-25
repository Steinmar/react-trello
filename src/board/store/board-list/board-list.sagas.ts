import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './board-list.actions';
import * as fromTypes from './board-list.types';
import api from 'src/core/api';
import requestErrorHandler from 'src/core/requestErrorHandler';

function* handleBoardListFetch() {
  try {
    const res = yield call(api, 'get', 'board/list');

    if (res.error) {
      yield put(fromActions.boardListFetchRequestError(res.error));
    } else {
      yield put(fromActions.boardListFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.boardListFetchRequestError);
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
    yield requestErrorHandler(err, fromActions.boardListCreateItemRequestError);
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
    yield requestErrorHandler(err, fromActions.boardListUpdateItemRequestError);
  }
}

function* handleBoardListDeleteItemFetch(id) {
  try {
    const res = yield call(api, 'delete', `board/${id}`);

    if (res.error) {
      yield put(fromActions.boardListDeleteItemRequestError(res.error));
    } else {
      yield put(fromActions.boardListDeleteItemRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.boardListDeleteItemRequestError);
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

function* watchBoardListDeleteItemRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.BoardListStateActionTypes.DELETE_ITEM_REQUEST
    );
    yield call(handleBoardListDeleteItemFetch, payload);
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

function* boardListSaga() {
  yield all([
    fork(watchBoardFetchRequest),
    fork(watchBoardListCreateItemRequest),
    fork(watchBoardListUpdateItemRequest),
    fork(watchBoardListDeleteItemRequest)
  ]);
}

export { boardListSaga };
