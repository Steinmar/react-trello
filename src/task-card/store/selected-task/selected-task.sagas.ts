import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './selected-task.actions';
import * as fromTypes from './selected-task.types';
import api from 'src/core/api';
import requestErrorHandler from 'src/core/requestErrorHandler';
import { TaskBaseModel, TaskModel } from '../../models/Task.model';
import * as _ from 'lodash';

function* handleGetTaskFetch(params: TaskBaseModel) {
  try {
    const res = yield call(
      api,
      'get',
      `board/${params.boardId}/column/${params.columnId}/task/${params.id}`
    );

    if (res.error) {
      yield put(fromActions.GetTaskFetchRequestError(res.error));
    } else {
      yield put(fromActions.GetTaskFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.GetTaskFetchRequestError);
  }
}

function* handleUpdateTaskFetch(params: TaskModel) {
  try {
    const res = yield call(
      api,
      'put',
      `board/${params.boardId}/column/${params.columnId}/task/${params.id}`,
      params
    );

    if (res.error) {
      yield put(fromActions.UpdateTaskFetchRequestError(res.error));
    } else {
      yield put(fromActions.UpdateTaskFetchRequestSuccess(res));
    }
  } catch (err) {
    yield requestErrorHandler(err, fromActions.UpdateTaskFetchRequestError);
  }
}

function* watchGetTaskFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.SelectedTaskStateActionTypes.GET_TASK_REQUEST
    );

    yield call(handleGetTaskFetch, {
      id: payload.taskId,
      ..._.omit(payload, 'taskId')
    });
  }
}

function* watchUpdateTaskFetchRequest() {
  while (true) {
    const { payload } = yield take(
      fromTypes.SelectedTaskStateActionTypes.UPDATE_TASK_REQUEST
    );

    yield call(handleUpdateTaskFetch, payload);
  }
}

function* selectedTaskSaga() {
  yield all([
    fork(watchGetTaskFetchRequest),
    fork(watchUpdateTaskFetchRequest)
  ]);
}

export { selectedTaskSaga };
