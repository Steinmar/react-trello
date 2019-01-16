import { all, fork } from 'redux-saga/effects';
import { boardListSaga } from './board-list/board-list.sagas';
import { boardDetailsSaga } from './board-details/board-details.sagas';

function* boardsSaga() {
  yield all([fork(boardListSaga), fork(boardDetailsSaga)]);
}

export { boardsSaga };
