import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './board-details.actions';
import * as fromTypes from './board-details.types';
import api from 'src/core/api';
import { ColumnModel } from 'src/board/models/BoardDetails.model';

function* handleBoardDetailsFetch(id: string) {
  try {
    const res = yield call(api, 'get', `board/${id}/details`);

    if (res.error) {
      yield put(fromActions.boardDetailsFetchRequestError(res.error));
    } else {
      yield put(fromActions.boardDetailsFetchRequestSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.boardDetailsFetchRequestError(err.stack!));
    } else {
      yield put(
        fromActions.boardDetailsFetchRequestError('An unknown error occured.')
      );
    }
  }
}

function* handleAddColumnsFetch(params: ColumnModel) {
  try {
    const res = yield call(
      api,
      'post',
      `board/${params.boardId}/column`,
      params
    );

    if (res.error) {
      yield put(fromActions.AddColumnFetchRequestError(res.error));
    } else {
      yield put(fromActions.AddColumnFetchRequestSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fromActions.AddColumnFetchRequestError(err.stack!));
    } else {
      yield put(
        fromActions.AddColumnFetchRequestError('An unknown error occured.')
      );
    }
  }
}

function* watchAddColumnsFetchRequest() {
  while (true) {
    const payload = yield take(
      fromTypes.BoardDetailsStateActionTypes.ADD_COLUMN_REQUEST
    );
    yield call(handleAddColumnsFetch, payload);
  }
}

function* watchBoardFetchRequest() {
  while (true) {
    const { id } = yield take(
      fromTypes.BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST
    );

    yield call(handleBoardDetailsFetch, id);
  }
}

function* boardDetailsSaga() {
  yield all([fork(watchBoardFetchRequest), fork(watchAddColumnsFetchRequest)]);
}

export { boardDetailsSaga };
