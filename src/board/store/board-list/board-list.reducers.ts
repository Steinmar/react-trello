import { Reducer } from 'redux';
import { BoardListState } from './board-list.types';
import { BoardListStateActionTypes } from './board-list.types';
import * as _ from 'lodash';

const boardListInitialState: BoardListState = {
  data: [],
  error: null,
  loading: false
};

const BoardListReducer: Reducer<BoardListState> = (
  state = boardListInitialState,
  action
) => {
  switch (action.type) {
    case BoardListStateActionTypes.FETCH_REQUEST:
    case BoardListStateActionTypes.CREATE_ITEM_REQUEST:
    case BoardListStateActionTypes.UPDATE_ITEM_REQUEST:
    case BoardListStateActionTypes.DELETE_ITEM_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case BoardListStateActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    }
    case BoardListStateActionTypes.FETCH_ERROR:
    case BoardListStateActionTypes.CREATE_ITEM_ERROR:
    case BoardListStateActionTypes.UPDATE_ITEM_ERROR:
    case BoardListStateActionTypes.DELETE_ITEM_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case BoardListStateActionTypes.CREATE_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload]
      };
    }
    case BoardListStateActionTypes.DELETE_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        data: state.data.filter(element => element.id !== action.payload.id)
      };
    }
    case BoardListStateActionTypes.UPDATE_ITEM_SUCCESS: {
      const data = _.map(state.data, _.clone);
      const updatedItem = action.payload;
      const updatedItemIndex = state.data.findIndex(
        element => element.id === updatedItem.id
      );
      data[updatedItemIndex] = updatedItem;
      return {
        ...state,
        loading: false,
        error: null,
        data
      };
    }
    default: {
      return state;
    }
  }
};

export { BoardListReducer };
