import { Error } from '../../core/models/Error';
import { RouteComponentProps } from 'react-router';

export interface BoardDetailsModel {
  name: string;
  id: string;
}

interface BoardDetailsMatchParams {
  boardId: string;
}

export interface BoardDetailsProps
  extends RouteComponentProps<BoardDetailsMatchParams> {
  data: BoardDetailsModel[];
  error: Error | null;
  loadData: (id: string) => void;
  addColumn: (event) => void;
  deleteColumn: (event) => void;
  renameColumn: (event) => void;
}
