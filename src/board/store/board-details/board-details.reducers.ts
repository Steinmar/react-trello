import { Reducer } from 'redux';

import {
  BoardDetailsStateActionTypes,
  BoardDetailsState
} from './board-details.types';

const boardListInitialState: BoardDetailsState = {
  data: [],
  error: null,
  loading: false
};

const BoardDetailsReducer: Reducer<BoardDetailsState> = (
  state = boardListInitialState,
  action
) => {
  switch (action.type) {
    case BoardDetailsStateActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case BoardDetailsStateActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
    case BoardDetailsStateActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }

    default: {
      return state;
    }
  }
};

export { BoardDetailsReducer };
