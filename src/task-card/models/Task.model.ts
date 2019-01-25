import { SelectedTaskData } from 'src/board/models/BoardDetails.model';

export interface TaskBaseModel {
  id: string;
  boardId: string;
  columnId: string;
  name: string;
  order: number;
}

export interface TaskModel extends TaskBaseModel {
  columnId: string;
  id: string;
  order: number;
  name: string;
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
