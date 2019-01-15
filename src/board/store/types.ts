import { Error } from '../../core/models/Error';
import { BoardListItem } from '../models/BoardList.model';

export const enum BoardListStateActionTypes {
  FETCH_REQUEST = '@@BoardList/FETCH_REQUEST',
  FETCH_SUCCESS = '@@BoardList/FETCH_SUCCESS',
  FETCH_ERROR = '@@BoardList/FETCH_ERROR',
  CREATE_ITEM_REQUEST = '@@BoardList/CREATE_ITEM_REQUEST',
  CREATE_ITEM_SUCCESS = '@@BoardList/CREATE_ITEM_SUCCESS',
  CREATE_ITEM_ERROR = '@@BoardList/CREATE_ITEM_ERROR',
  UPDATE_ITEM_REQUEST = '@@BoardList/UPDATE_ITEM_REQUEST',
  UPDATE_ITEM_SUCCESS = '@@BoardList/UPDATE_ITEM_SUCCESS',
  UPDATE_ITEM_ERROR = '@@BoardList/UPDATE_ITEM_ERROR',
  DELETE_ITEM_REQUEST = '@@BoardList/DELETE_ITEM_REQUEST',
  DELETE_ITEM_SUCCESS = '@@BoardList/DELETE_ITEM_SUCCESS',
  DELETE_ITEM_ERROR = '@@BoardList/DELETE_ITEM_ERROR'
}

export interface BoardListState {
  readonly loading: boolean;
  readonly data: BoardListItem[];
  readonly error: Error | null;
}
