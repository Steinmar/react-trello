import { Error } from '../../../core/models/Error';
import { BoardListItem } from './BoardListItem.model';

export interface BoardListProps {
  list: BoardListItem[];
  error: Error | null;
  addBoard: (event) => void;
  updateBoard: (item: BoardListItem) => void;
  deleteBoard: (id: string) => void;
}

export interface BoardListModel {
  list: BoardListItem[];
}

export interface BoardListItemState {
  newName: string;
}
