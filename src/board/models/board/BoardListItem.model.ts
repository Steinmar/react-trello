import { Error } from '../../../core/models/Error';

export interface BoardListItem {
  name: string;
  id: string;
  error?: Error;
}

export interface BoardListItemProps extends BoardListItem {
  updateBoard: (item: BoardListItem) => void;
  deleteBoard: (id: string) => void;
}
