import { SelectedTaskData } from 'src/board/models/BoardDetails.model';

export interface TaskPathModel {
  id: string;
  boardId: string;
  columnId: string;
}

export interface TaskBaseModel extends TaskPathModel {
  name: string;
  order: number;
}

export interface TaskModel extends TaskBaseModel {
  description: string;
  status: string;
}

export interface ShortTaskProps extends TaskBaseModel {
  selectTask: (data: SelectedTaskData) => void;
}

export interface NewTask {
  name: string;
  columnId: string;
  boardId: string;
}
