import { action } from 'src/core/ReduxUtils';
import { BoardDetailsStateActionTypes } from './board-details.types';

export const boardDetailsFetchRequest = id =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST, id);
export const boardDetailsFetchRequestSuccess = data =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_SUCCESS, data);
export const boardDetailsFetchRequestError = data =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_ERROR, data);

export const AddColumnFetchRequest = payload =>
  action(BoardDetailsStateActionTypes.ADD_COLUMN_REQUEST, payload);
export const AddColumnFetchRequestSuccess = data =>
  action(BoardDetailsStateActionTypes.ADD_COLUMN_SUCCESS, data);
export const AddColumnFetchRequestError = data =>
  action(BoardDetailsStateActionTypes.ADD_COLUMN_ERROR, data);
