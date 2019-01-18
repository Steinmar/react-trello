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
  id: string;
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
  addColumn: (data: NewColumnData) => void;
  addTask: () => void;
  deleteColumn: (event) => void;
  renameColumn: (event) => void;
  updateColumn: (event) => void;
}

export interface NewColumnData {
  name: string;
  boardId: string;
}

export interface BoardProps extends BoardDetailsModel {
  columnProhibitedNames: string[];
  addNewColumn: (data: NewColumnData) => void;
  addNewTask: () => void;
  renameColumn: (data: ColumnModel) => void;
}
export interface ColumnProps extends ColumnModel {
  columnProhibitedNames: string[];
  addNewTask: () => void;
  renameColumn: (data: ColumnModel) => void;
}

export type ShortTaskProps = TaskBaseModel;
