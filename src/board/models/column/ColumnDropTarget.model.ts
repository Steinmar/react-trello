import { ReactNode } from 'react';

export interface ColumnDropTargetProps {
  children?: ReactNode;
  id: string;
  boardId: string;
  connectDropTarget?: any;
  item?: any;
  isOver?: any;
  dropResult?: any;
}
