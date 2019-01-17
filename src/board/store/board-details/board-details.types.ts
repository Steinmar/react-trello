import { Error } from '../../../core/models/Error';
import { BoardDetailsModel } from '../../models/BoardDetails.model';

export const enum BoardDetailsStateActionTypes {
  FETCH_DETAILS_REQUEST = '@@BoardDetails/FETCH_DETAILS_REQUEST',
  FETCH_DETAILS_SUCCESS = '@@BoardDetails/FETCH_DETAILS_SUCCESS',
  FETCH_DETAILS_ERROR = '@@BoardDetails/FETCH_DETAILS_ERROR',

  ADD_COLUMN_REQUEST = '@@BoardDetails/ADD_COLUMN_REQUEST',
  ADD_COLUMN_SUCCESS = '@@BoardDetails/ADD_COLUMN_SUCCESS',
  ADD_COLUMN_ERROR = '@@BoardDetails/ADD_COLUMN_ERROR'
}

export interface BoardDetailsState {
  readonly loading: boolean;
  readonly data: BoardDetailsModel[];
  readonly error: Error | null;
}
