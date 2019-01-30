import { TaskBaseModel, NewTask } from '../../task-card/models/Task.model';
import { ChangedTaskColumnInfo } from './ShortTaskDraggable.model';

export interface ColumnModel {
  id: string;
  boardId: string;
  name: string;
  order: number;
  tasks: TaskBaseModel[];
}

export interface ColumnProps extends ColumnModel {
  columnProhibitedNames: string[];
  renameColumn: (data: ColumnModel) => void;
  deleteColumn: (data: ColumnModel) => void;
  addNewTask: (data: NewTask) => void;
  selectTask: (data) => void;
  changeTaskColumn: (data: ChangedTaskColumnInfo) => void;
}

export interface NewColumnData {
  name: string;
  boardId: string;
}
