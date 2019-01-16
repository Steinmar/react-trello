import { Error } from '../../../core/models/Error';
import { BoardDetailsModel } from '../../models/BoardDetails.model';

export const enum BoardDetailsStateActionTypes {
  FETCH_REQUEST = '@@BoardDetails/FETCH_REQUEST',
  FETCH_SUCCESS = '@@BoardDetails/FETCH_SUCCESS',
  FETCH_ERROR = '@@BoardDetails/FETCH_ERROR'
}

export interface BoardDetailsState {
  readonly loading: boolean;
  readonly data: BoardDetailsModel[];
  readonly error: Error | null;
}
