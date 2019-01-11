import { combineReducers, Dispatch, Action, AnyAction, Reducer } from 'redux';
import {
  connectRouter,
  RouterState,
  LocationChangeAction
} from 'connected-react-router';
import { all, fork } from 'redux-saga/effects';
import authSaga from 'src/auth/store/auth.sagas';
import {
  LoginState,
  SignUpState,
  loginReducer,
  SignUpReducer
} from 'src/auth/store';

export interface ApplicationState {
  router: Reducer<Reducer<RouterState, LocationChangeAction>, AnyAction>;
  login: LoginState;
  signUp: SignUpState;
  userState: any;
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

export function createRootReducer(history) {
  return combineReducers<ApplicationState>({
    router: connectRouter(history),
    login: loginReducer,
    signUp: SignUpReducer
  } as any);
}

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
