import { all, fork } from 'redux-saga/effects';
import { selectedTaskSaga } from './selected-task/selected-task.sagas';

function* taskSaga() {
  yield all([fork(selectedTaskSaga)]);
}

export { taskSaga };
