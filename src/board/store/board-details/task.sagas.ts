import { all, call, fork, put, take, select } from 'redux-saga/effects';
import * as fromActions from './board-details.actions';
import * as fromTypes from './board-details.types';
import api from 'src/core/api';
import requestErrorHandler from 'src/core/requestErrorHandler';
import { TaskBaseModel } from 'src/task-card/models';

const getActiveBoard = state => state.board;

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

function* taskSaga() {
  yield all([fork(watchAddTaskFetchRequest)]);
}

export { taskSaga };
