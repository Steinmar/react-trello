import { Reducer } from 'redux';
import {
  SelectedTaskStateActionTypes,
  SelectedTaskState
} from './selected-task.types';
import * as _ from 'lodash';

const boardListInitialState: SelectedTaskState = {
  data: null as any,
  error: null,
  loading: false,
  removedTask: null
};

const SelectedTaskReducer: Reducer<SelectedTaskState> = (
  state = boardListInitialState,
  action
) => {
  switch (action.type) {
    case SelectedTaskStateActionTypes.GET_TASK_REQUEST:
    case SelectedTaskStateActionTypes.DELETE_TASK_REQUEST: {
      return {
        ...state,
        removedTask: null,
        loading: true,
        error: null
      };
    }
    case SelectedTaskStateActionTypes.GET_TASK_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    }
    case SelectedTaskStateActionTypes.UPDATE_TASK_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          task: action.payload
        },
        loading: true
      };
    }
    case SelectedTaskStateActionTypes.UPDATE_TASK_SUCCESS: {
      return {
        ...state,
        loading: false
      };
    }
    case SelectedTaskStateActionTypes.DELETE_TASK_SUCCESS: {
      return {
        ...state,
        removedTask: action.payload,
        loading: false
      };
    }
    case SelectedTaskStateActionTypes.GET_TASK_ERROR:
    case SelectedTaskStateActionTypes.UPDATE_TASK_ERROR:
    case SelectedTaskStateActionTypes.DELETE_TASK_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case SelectedTaskStateActionTypes.CLEAR_SELECTED_TASK: {
      return boardListInitialState;
    }
    default: {
      return state;
    }
  }
};

export { SelectedTaskReducer };
