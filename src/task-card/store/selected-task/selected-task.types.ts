import { Error } from '../../../core/models/Error';
import { SelectedTaskData } from '../../models';

export const enum SelectedTaskStateActionTypes {
  GET_TASK_REQUEST = '@@Task/GET_TASK_REQUEST',
  GET_TASK_SUCCESS = '@@Task/GET_TASK_SUCCESS',
  GET_TASK_ERROR = '@@Task/GET_TASK_ERROR',
  UPDATE_TASK_REQUEST = '@@Task/UPDATE_TASK_REQUEST',
  UPDATE_TASK_SUCCESS = '@@Task/UPDATE_TASK_SUCCESS',
  UPDATE_TASK_ERROR = '@@Task/UPDATE_TASK_ERROR',
  CLEAR_SELECTED_TASK = '@@Task/CLEAR_SELECTED_TASK'
}

export interface SelectedTaskState {
  readonly loading: boolean;
  readonly data: SelectedTaskData;
  readonly error: Error | null;
}
