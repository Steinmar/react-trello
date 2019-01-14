import { combineReducers, Dispatch, Action, AnyAction, Reducer } from 'redux';
import {
  connectRouter,
  RouterState,
  LocationChangeAction
} from 'connected-react-router';
import { all, fork } from 'redux-saga/effects';
import {
  LoginState,
  SignUpState,
  loginReducer,
  SignUpReducer,
  authSaga
} from 'src/auth/store';
import { BoardListState, BoardListReducer, boardsSaga } from 'src/board/store';

export interface ApplicationState {
  router: Reducer<Reducer<RouterState, LocationChangeAction>, AnyAction>;
  login: LoginState;
  signUp: SignUpState;
  boards: BoardListState;
  userState: any;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export function createRootReducer(history) {
  return combineReducers<ApplicationState>({
    router: connectRouter(history),
    login: loginReducer,
    signUp: SignUpReducer,
    boards: BoardListReducer
  } as any);
}

export function* rootSaga() {
  yield all([fork(authSaga), fork(boardsSaga)]);
}
