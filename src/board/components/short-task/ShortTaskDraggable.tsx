import * as React from 'react';
import { DragSource } from 'react-dnd';
import { ShortTaskDraggableProps, DraggableTypes } from '../../models';

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview(),
    initialClientOffset: monitor.getInitialClientOffset(),
    clientOffset: monitor.getClientOffset(),
    item: monitor.getItem()
  };
}

const shortTaskSource = {
  beginDrag(props, monitor) {
    return { draggingTaskId: props.id, dropResult: monitor.getDropResult() };
  },
  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();

    if (monitor.didDrop() && dropResult.isOver) {
      props.changeTaskColumn({
        boardId: dropResult.boardId,
        columnId: dropResult.id,
        oldColumnId: props.columnId,
        taskId: props.id
      });
    }
  }
};

class ShortTaskDraggable extends React.Component<ShortTaskDraggableProps> {
  constructor(props: ShortTaskDraggableProps) {
    super(props);
  }

  public render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

export default DragSource(DraggableTypes.SHORT_TASK, shortTaskSource, collect)(
  ShortTaskDraggable
);
