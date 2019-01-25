import { action } from 'src/core/ReduxUtils';
import { SelectedTaskStateActionTypes } from './selected-task.types';
import { TaskBaseModel, TaskModel } from '../../models/Task.model';

export const GetTaskFetchRequest = (payload: TaskBaseModel) =>
  action(SelectedTaskStateActionTypes.GET_TASK_REQUEST, payload);
export const GetTaskFetchRequestSuccess = (payload: TaskModel) =>
  action(SelectedTaskStateActionTypes.GET_TASK_SUCCESS, payload);
export const GetTaskFetchRequestError = payload =>
  action(SelectedTaskStateActionTypes.GET_TASK_ERROR, payload);

export const UpdateTaskFetchRequest = (payload: TaskBaseModel) =>
  action(SelectedTaskStateActionTypes.UPDATE_TASK_REQUEST, payload);
export const UpdateTaskFetchRequestSuccess = (payload: TaskModel) =>
  action(SelectedTaskStateActionTypes.UPDATE_TASK_SUCCESS, payload);
export const UpdateTaskFetchRequestError = payload =>
  action(SelectedTaskStateActionTypes.UPDATE_TASK_ERROR, payload);
