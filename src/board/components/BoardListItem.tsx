import * as React from 'react';
import { BoardListItemProps } from '../models/BoardList.model';

class BoardListItem extends React.Component<BoardListItemProps> {
  constructor(props: BoardListItemProps) {
    super(props);
  }

  public render() {
    return <div>Board list item</div>;
  }
}

export default BoardListItem;
