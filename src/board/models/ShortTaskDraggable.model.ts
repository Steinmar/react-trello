import { ReactNode } from 'react';

export interface ChangedTaskColumnInfo {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface ShortTaskDraggableProps {
  children?: ReactNode;
  connectDragSource: any;
  isDragging: any;
  initialClientOffset: any;
  clientOffset: any;
  id: string;
  changeTaskColumn: (data: ChangedTaskColumnInfo) => {};
}
