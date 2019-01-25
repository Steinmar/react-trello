import { Reducer } from 'redux';
import {
  BoardDetailsStateActionTypes,
  BoardDetailsState
} from './board-details.types';
import { ColumnModel } from 'src/board/models/Column.model';
import * as _ from 'lodash';
import { TaskBaseModel } from 'src/task-card/models';

type OrderSortable = ColumnModel | TaskBaseModel;

const boardListInitialState: BoardDetailsState = {
  data: null as any,
  error: null,
  loading: false
};

const BoardDetailsReducer: Reducer<BoardDetailsState> = (
  state = boardListInitialState,
  action
) => {
  switch (action.type) {
    case BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST:
    case BoardDetailsStateActionTypes.ADD_COLUMN_REQUEST:
    case BoardDetailsStateActionTypes.UPDATE_COLUMN_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case BoardDetailsStateActionTypes.ADD_COLUMN_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          columns: [...state.data.columns, action.payload]
        },
        error: null
      };
    }
    case BoardDetailsStateActionTypes.FETCH_DETAILS_SUCCESS: {
      const columns = action.payload.columns.map(item => {
        return {
          ..._.omit(item, 'tasks'),
          tasks: item.tasks.sort(sortItemsByOrder)
        };
      });
      const sortedColumns = columns.sort(sortItemsByOrder);
      return {
        ...state,
        loading: false,
        data: {
          ...action.payload,
          columns: sortedColumns
        }
      };
    }
    case BoardDetailsStateActionTypes.FETCH_DETAILS_ERROR:
    case BoardDetailsStateActionTypes.UPDATE_COLUMN_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }

    case BoardDetailsStateActionTypes.UPDATE_COLUMN_SUCCESS:
    case BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_SUCCESS: {
      const updatedItem = action.payload;
      const updatedItemIndex = state.data.columns.findIndex(
        element => element.id === updatedItem.id
      );
      const updatedColumns = _.map(state.data.columns, _.clone);
      updatedColumns[updatedItemIndex] = updatedItem;
      return {
        ...state,
        data: {
          ...state.data,
          columns: updatedColumns
        },
        loading: true,
        error: null
      };
    }

    default: {
      return state;
    }
  }
};

export { BoardDetailsReducer };

function sortItemsByOrder(a: OrderSortable, b: OrderSortable) {
  return a.order < b.order;
}
