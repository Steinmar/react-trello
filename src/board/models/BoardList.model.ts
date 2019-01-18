import { Error } from '../../core/models/Error';

export interface BoardListItem {
  name: string;
  id: string;
  error?: Error;
}

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
