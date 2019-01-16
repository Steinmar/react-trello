import { Error } from '../../core/models/Error';
import { RouteComponentProps } from 'react-router';

export interface TaskBaseModel {
  boardId: string;
  name: string;
  order: number;
}

export interface TaskModel extends TaskBaseModel {
  boardId: string;
  columnId: string;
  id: string;
  order: number;
  name: string;
  description: string;
  status: string;
}

export interface ColumnModel {
  boardId: string;
  name: string;
  order: number;
  tasks: TaskBaseModel[];
}

export interface BoardDetailsModel {
  name: string;
  id: string;
  columns: ColumnModel[];
}

interface BoardDetailsMatchParams {
  boardId: string;
}

export interface BoardDetailsProps
  extends RouteComponentProps<BoardDetailsMatchParams> {
  data: BoardDetailsModel;
  error: Error | null;
  loadData: (id: string) => void;
  addColumn: () => void;
  addTask: () => void;
  deleteColumn: (event) => void;
  renameColumn: (event) => void;
}

export interface BoardProps extends BoardDetailsModel {
  addNewColumn: () => void;
  addNewTask: () => void;
}
export interface ColumnProps extends ColumnModel {
  addNewTask: () => void;
}

export type ShortTaskProps = TaskBaseModel;
