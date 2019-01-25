import { Reducer } from 'redux';
import {
  SignUpState,
  SignUpStateActionTypes,
  LoginState,
  LoginStateActionTypes
} from './types';
import AuthManager from 'src/core/AuthTokenManager';

const signUpInitialState: SignUpState = {
  data: {
    email: '',
    name: '',
    redirectToLogin: false
  },
  error: null,
  loading: false
};

const localAuthData = AuthManager.getAuthData();
const noUserInfoData = { email: '', name: '' };
const initialUserInfo = localAuthData
  ? {
      email: localAuthData.email,
      name: localAuthData.name
    }
  : noUserInfoData;

const loginInitialState: LoginState = {
  data: {
    ...initialUserInfo,
    showSignUpSuccessMessage: false,
    sessionExpired: false
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
    case SignUpStateActionTypes.CLEAR_DATA: {
      return signUpInitialState;
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
    case LoginStateActionTypes.FETCH_LOGOUT_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          sessionExpired: action.payload
        }
      };
    }
    case LoginStateActionTypes.FETCH_LOGOUT_SUCCESS: {
      return {
        ...loginInitialState,
        data: {
          ...loginInitialState.data,
          ...noUserInfoData,
          sessionExpired: state.data.sessionExpired
        }
      };
    }
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
    case LoginStateActionTypes.SHOW_SIGN_UP_SUCCESS_MESSAGE: {
      return {
        ...state,
        data: { ...state.data, showSignUpSuccessMessage: true }
      };
    }
    case LoginStateActionTypes.HIDE_SIGN_UP_SUCCESS_MESSAGE: {
      return {
        ...state,
        data: { ...state.data, showSignUpSuccessMessage: false }
      };
    }
    default: {
      return state;
    }
  }
};

export { SignUpReducer, loginReducer };
