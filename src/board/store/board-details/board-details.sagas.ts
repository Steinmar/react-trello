import { all, call, fork, put, take, select } from 'redux-saga/effects';
import * as fromActions from './board-details.actions';
import * as fromTypes from './board-details.types';
import api from 'src/core/api';
import requestErrorHandler from 'src/core/requestErrorHandler';
import { ColumnModel } from 'src/board/models/Column.model';
import { TaskBaseModel } from 'src/task-card/models/Task.model';

const getActiveBoard = state => state.board;

function* handleBoardDetailsFetch(id: string) {
  try {
    const res = yield call(api, 'get', `board/${id}/details`);

    if (res.error) {
      yield put(fromActions.boardDetailsFetchRequestError(res.error));
    } else {
      yield put(fromActions.boardDetailsFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.boardDetailsFetchRequestError);
  }
}

function* handleAddColumnsFetch(params: ColumnModel) {
  try {
    const reqParams: ColumnModel = {
      ...params,
      tasks: []
    };
    const res = yield call(
      api,
      'post',
      `board/${params.boardId}/column`,
      reqParams
    );

    if (res.error) {
      yield put(fromActions.AddColumnFetchRequestError(res.error));
    } else {
      yield put(fromActions.AddColumnFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.AddColumnFetchRequestError);
  }
}

function* handleUpdateColumnsFetch(params: ColumnModel) {
  try {
    const res = yield call(
      api,
      'put',
      `board/${params.boardId}/column/${params.id}`,
      params
    );

    if (res.error) {
      yield put(fromActions.UpdateColumnFetchRequestError(res.error));
    } else {
      yield put(fromActions.UpdateColumnFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.UpdateColumnFetchRequestError);
  }
}

function* handleAddTaskFetch(params: TaskBaseModel) {
  try {
    const res = yield call(
      api,
      'post',
      `board/${params.boardId}/column/${params.columnId}/task`,
      params
    );

    if (res.error) {
      yield put(fromActions.AddTaskToColumnFetchRequestError(res.error));
    } else {
      yield put(fromActions.AddTaskToColumnFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(
      err,
      fromActions.AddTaskToColumnFetchRequestError
    );
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

function* watchAddColumnsFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.BoardDetailsStateActionTypes.ADD_COLUMN_REQUEST
    );
    const { data: activeBoard } = yield select(getActiveBoard);

    yield call(handleAddColumnsFetch, {
      ...payload,
      order: activeBoard.columns.length
    });
  }
}

function* watchUpdateColumnsFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.BoardDetailsStateActionTypes.UPDATE_COLUMN_REQUEST
    );

    yield call(handleUpdateColumnsFetch, payload);
  }
}

function* watchAddTaskFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_REQUEST
    );
    const { data } = yield select(getActiveBoard);
    const parentColumn = data.columns.find(
      column => column.id === payload.columnId
    );

    yield call(handleAddTaskFetch, {
      ...payload,
      order: parentColumn.tasks.length
    });
  }
}

function* boardDetailsSaga() {
  yield all([
    fork(watchBoardFetchRequest),
    fork(watchAddColumnsFetchRequest),
    fork(watchUpdateColumnsFetchRequest),
    fork(watchAddTaskFetchRequest)
  ]);
}

export { boardDetailsSaga };
