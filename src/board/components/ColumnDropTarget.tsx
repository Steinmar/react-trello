import * as React from 'react';
import { DropTarget } from 'react-dnd';
import { ColumnDropTargetProps } from '../models/ColumnDropTarget.model';
import { DraggableTypes } from '../models/DraggableTypes';

const columnTarget = {
  drop(props: ColumnDropTargetProps, monitor) {
    return {
      id: props.id,
      boardId: props.boardId,
      isOver: monitor.isOver(),
      item: monitor.getDropResult()
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    dropResult: monitor.getDropResult()
  };
}

export class ColumnDropTarget extends React.Component<ColumnDropTargetProps> {
  constructor(props: ColumnDropTargetProps) {
    super(props);
  }

  public render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

export default DropTarget(DraggableTypes.SHORT_TASK, columnTarget, collect)(
  ColumnDropTarget
);
