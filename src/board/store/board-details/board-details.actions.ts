import { action } from 'src/core/ReduxUtils';
import { BoardDetailsStateActionTypes } from './board-details.types';

export const boardDetailsFetchRequest = id =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST, id);
export const boardDetailsFetchRequestSuccess = data =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_SUCCESS, data);
export const boardDetailsFetchRequestError = data =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_ERROR, data);
