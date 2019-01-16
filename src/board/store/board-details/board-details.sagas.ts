import { all, call, fork, put, take } from 'redux-saga/effects';
import * as fromActions from './board-details.actions';
import * as fromTypes from './board-details.types';
import api from 'src/core/api';

function* handleBoardDetailsFetch(id: string) {
  try {
    const res = yield call(api, 'get', `board/${id}/details`);
    // const res = yield call(api, 'get', `board/${id}`);

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

function* watchBoardFetchRequest() {
  while (true) {
    const { id } = yield take(
      fromTypes.BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST
    );

    yield call(handleBoardDetailsFetch, id);
  }
}

function* boardDetailsSaga() {
  yield all([fork(watchBoardFetchRequest)]);
}

export { boardDetailsSaga };
