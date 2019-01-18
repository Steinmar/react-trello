import { SelectedTaskData } from './SelectedTaskData.model';
import { TaskDetailsBodyData } from './TaskDetailsBody.model';
import { TaskModel } from './Task.model';

export interface TaskFetchData {
  taskId: string;
  boardId: string;
  columnId: string;
}

export interface TaskDetailPopupProps extends TaskFetchData {
  data?: SelectedTaskData;
  taskId: string;
  boardId: string;
  columnId: string;
  closeAndSubmit: () => void;
  loadData?: (payload: TaskFetchData) => void;
  updateTask?: (payload: TaskModel) => void;
  clearSelectedTask?: () => void;
}

export interface TaskDetailPopupState {
  changes: TaskDetailsBodyData | null;
}
