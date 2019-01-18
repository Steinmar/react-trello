import { TaskModel } from './Task.model';

export interface SelectedTaskData {
  task: TaskModel;
  statuses: string[];
}
