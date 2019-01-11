import { Reducer } from 'redux';
import { SignUpState, SignUpStateActionTypes, LoginState } from './types';

const signUpInitialState: SignUpState = {
  data: {
    email: '',
    name: ''
  },
  error: null,
  loading: false
};

const loginInitialState: LoginState = {
  data: {
    email: '',
    name: ''
  },
  error: null,
  loading: false
};

const SignUpReducer: Reducer<SignUpState> = (
  state = signUpInitialState,
  action
) => {
  switch (action.type) {
    case SignUpStateActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case SignUpStateActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    }
    case SignUpStateActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

const loginReducer: Reducer<LoginState> = (
  state = loginInitialState,
  action
) => {
  switch (action.type) {
    case SignUpStateActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case SignUpStateActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    }
    case SignUpStateActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { SignUpReducer, loginReducer };
