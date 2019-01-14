import { Reducer } from 'redux';
import {
  SignUpState,
  SignUpStateActionTypes,
  LoginState,
  LoginStateActionTypes
} from './types';

const signUpInitialState: SignUpState = {
  data: {
    email: '',
    name: '',
    redirectToLogin: false
  },
  error: null,
  loading: false
};

const loginInitialState: LoginState = {
  data: {
    email: '',
    name: '',
    showSuccessMessage: false
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
        data: {
          ...action.payload,
          redirectToLogin: true
        },
        error: null
      };
    }
    case SignUpStateActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case SignUpStateActionTypes.CLEAR_REDIRECT_FLAG: {
      return {
        loading: false,
        data: {
          ...state.data,
          redirectToLogin: false
        },
        error: null
      };
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
    case LoginStateActionTypes.FETCH_LOGIN_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LoginStateActionTypes.FETCH_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    }
    case LoginStateActionTypes.FETCH_LOGIN_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case LoginStateActionTypes.SHOW_INFO_SUCCESS_MESSAGE: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, showSuccessMessage: true }
      };
    }
    case LoginStateActionTypes.HIDE_INFO_SUCCESS_MESSAGE: {
      return {
        ...state,
        loading: false,
        data: { ...state.data, showSuccessMessage: false }
      };
    }
    default: {
      return state;
    }
  }
};

export { SignUpReducer, loginReducer };
