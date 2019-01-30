import { TaskDetailsBodyData } from './TaskDetailsBody.model';
import { TaskModel, TaskPathModel } from './Task.model';
import { SelectedTaskData } from './SelectedTaskData.model';

export interface TaskFetchData {
  taskId: string;
  boardId: string;
  columnId: string;
}

// ToDo refactor this and state model
// this stuff should extends state model to avoid copy
// paste with optional props
export interface TaskDetailPopupProps extends TaskFetchData {
  loading?: boolean;
  removedTask?: TaskPathModel | null;
  data?: SelectedTaskData;
  taskId: string;
  boardId: string;
  columnId: string;
  closeAndSubmit: (dataWasChanged: boolean) => void;
  loadData?: (payload: TaskFetchData) => void;
  updateTask?: (payload: TaskModel) => void;
  deleteTask?: (payload: TaskPathModel) => void;
  clearSelectedTask?: () => void;
}

export interface TaskDetailPopupState {
  changes: TaskDetailsBodyData | null;
}
