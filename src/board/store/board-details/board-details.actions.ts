import { action } from 'src/core/ReduxUtils';
import { BoardDetailsStateActionTypes } from './board-details.types';
import { ColumnModel } from '../../models';
import { TaskBaseModel, TaskModel } from 'src/task-card/models/Task.model';

export const boardDetailsFetchRequest = id =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST, id);
export const boardDetailsFetchRequestSuccess = data =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_SUCCESS, data);
export const boardDetailsFetchRequestError = data =>
  action(BoardDetailsStateActionTypes.FETCH_DETAILS_ERROR, data);

export const AddColumnFetchRequest = (payload: ColumnModel) =>
  action(BoardDetailsStateActionTypes.ADD_COLUMN_REQUEST, payload);
export const AddColumnFetchRequestSuccess = (payload: ColumnModel) =>
  action(BoardDetailsStateActionTypes.ADD_COLUMN_SUCCESS, payload);
export const AddColumnFetchRequestError = payload =>
  action(BoardDetailsStateActionTypes.ADD_COLUMN_ERROR, payload);

export const UpdateColumnFetchRequest = (payload: ColumnModel) =>
  action(BoardDetailsStateActionTypes.UPDATE_COLUMN_REQUEST, payload);
export const UpdateColumnFetchRequestSuccess = (payload: ColumnModel) =>
  action(BoardDetailsStateActionTypes.UPDATE_COLUMN_SUCCESS, payload);
export const UpdateColumnFetchRequestError = payload =>
  action(BoardDetailsStateActionTypes.UPDATE_COLUMN_ERROR, payload);

export const DeleteColumnFetchRequest = (payload: ColumnModel) =>
  action(BoardDetailsStateActionTypes.DELETE_COLUMN_REQUEST, payload);
export const DeleteColumnFetchRequestSuccess = (payload: ColumnModel) =>
  action(BoardDetailsStateActionTypes.DELETE_COLUMN_SUCCESS, payload);
export const DeleteColumnFetchRequestError = payload =>
  action(BoardDetailsStateActionTypes.DELETE_COLUMN_ERROR, payload);

export const AddTaskToColumnFetchRequest = (payload: TaskBaseModel) =>
  action(BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_REQUEST, payload);
export const AddTaskToColumnFetchRequestSuccess = (payload: TaskModel) =>
  action(BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_SUCCESS, payload);
export const AddTaskToColumnFetchRequestError = payload =>
  action(BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_ERROR, payload);
