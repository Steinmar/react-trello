import { Reducer } from 'redux';
import {
  SelectedTaskStateActionTypes,
  SelectedTaskState
} from './selected-task.types';
import * as _ from 'lodash';

const boardListInitialState: SelectedTaskState = {
  data: null as any,
  error: null,
  loading: false
};

const SelectedTaskReducer: Reducer<SelectedTaskState> = (
  state = boardListInitialState,
  action
) => {
  switch (action.type) {
    case SelectedTaskStateActionTypes.GET_TASK_REQUEST: {
      return {
        ...state,
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
    case SelectedTaskStateActionTypes.GET_TASK_ERROR: {
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
