import { action } from 'src/core/ReduxUtils';
import { BoardListStateActionTypes } from './board-list.types';

export const boardListFetchRequest = () =>
  action(BoardListStateActionTypes.FETCH_REQUEST);
export const boardListFetchRequestSuccess = data =>
  action(BoardListStateActionTypes.FETCH_SUCCESS, data);
export const boardListFetchRequestError = data =>
  action(BoardListStateActionTypes.FETCH_ERROR, data);

export const boardListCreateItemRequest = data =>
  action(BoardListStateActionTypes.CREATE_ITEM_REQUEST, data);
export const boardListCreateItemRequestSuccess = data =>
  action(BoardListStateActionTypes.CREATE_ITEM_SUCCESS, data);
export const boardListCreateItemRequestError = data =>
  action(BoardListStateActionTypes.CREATE_ITEM_ERROR, data);

export const boardListUpdateItemRequest = data =>
  action(BoardListStateActionTypes.UPDATE_ITEM_REQUEST, data);
export const boardListUpdateItemRequestSuccess = data =>
  action(BoardListStateActionTypes.UPDATE_ITEM_SUCCESS, data);
export const boardListUpdateItemRequestError = data =>
  action(BoardListStateActionTypes.UPDATE_ITEM_ERROR, data);

export const boardListDeleteItemRequest = data =>
  action(BoardListStateActionTypes.DELETE_ITEM_REQUEST, data);
export const boardListDeleteItemRequestSuccess = data =>
  action(BoardListStateActionTypes.DELETE_ITEM_SUCCESS, data);
export const boardListDeleteItemRequestError = data =>
  action(BoardListStateActionTypes.DELETE_ITEM_ERROR, data);
