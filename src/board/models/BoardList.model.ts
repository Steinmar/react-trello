import { Error } from '../../core/models/Error';

export interface BoardListItem {
  name: string;
  id: string;
}

export interface BoardListItemProps extends BoardListItem {
  error: Error;
  renameBoard: (event) => void;
  deleteBoard: (event) => void;
}

export interface BoardListProps {
  list: BoardListItem[];
  error: Error | null;
  addBoard: (event) => void;
  updateBoard: (event) => void;
  deleteBoard: (event) => void;
}

export interface BoardListModel {
  list: BoardListItem[];
}
