import { Error } from '../../../core/models/Error';
import { NewTask } from '../../../task-card/models/Task.model';
import { RouteComponentProps } from 'react-router';
import { TaskFetchData } from 'src/task-card/models';
import { ChangedTaskColumnInfo } from '../ShortTaskDraggable.model';
import { ColumnModel, NewColumnData } from '../column';

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
  addTask: (task: NewTask) => void;
  deleteColumn: (event) => void;
  renameColumn: (event) => void;
  updateColumn: (event) => void;
  changeTaskColumn: (event) => void;
}

export interface BoardDetailsState {
  shownTaskDataPopup: SelectedTaskData | null;
  shownDeleteColumnPopup: boolean;
  columnDataToDelete?: ColumnModel;
}

export interface BoardProps extends BoardDetailsModel {
  columnProhibitedNames: string[];
  addNewColumn: (data: NewColumnData) => void;
  addNewTask: (data: NewTask) => void;
  renameColumn: (data: ColumnModel) => void;
  deleteColumn: (data: ColumnModel) => void;
  selectTask: (data) => void;
  changeTaskColumn: (data: ChangedTaskColumnInfo) => void;
}

export type SelectedTaskData = TaskFetchData;
