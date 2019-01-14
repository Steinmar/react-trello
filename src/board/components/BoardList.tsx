import * as React from 'react';
import { BoardListProps } from '../models/BoardList.model';

class BoardList extends React.Component<BoardListProps> {
  constructor(props: any) {
    super(props);

    console.log(this.props.addBoard);
    console.log(this.props.deleteBoard);
    console.log(this.props.updateBoard);
    console.log(this.props.error);
    console.log(this.props.list);
  }

  public render() {
    return <div>Page with board list</div>;
  }
}

export default BoardList;
