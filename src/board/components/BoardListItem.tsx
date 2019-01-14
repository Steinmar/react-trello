import * as React from 'react';
import {
  BoardListItemProps,
  BoardListItemState
} from '../models/BoardList.model';

class BoardListItem extends React.Component<
  BoardListItemProps,
  BoardListItemState
> {
  constructor(props: BoardListItemProps) {
    super(props);

    this.state = {
      newName: ''
    };

    this.renameBoard = this.renameBoard.bind(this);
    this.newNameChange = this.newNameChange.bind(this);
  }

  public render() {
    return (
      <div>
        {this.state.newName ? (
          <div>
            <input
              type="text"
              value={this.state.newName}
              onChange={this.newNameChange}
            />
            <button onClick={this.renameBoard}>save</button>
          </div>
        ) : (
          <div>
            <span>{this.props.name}</span>
            <button onClick={this.renameBoard}>rename</button>
          </div>
        )}
        <button onClick={this.props.deleteBoard}>delete</button>
      </div>
    );
  }

  private newNameChange(event) {
    const newName = event.target.value;
    this.setState(_ => ({
      newName
    }));
  }

  private renameBoard() {
    this.setState(state => {
      const hasNewName = !!state.newName;
      if (hasNewName) {
        this.props.renameBoard({
          id: this.props.id,
          name: state.newName
        });
      }
      return { newName: !hasNewName ? this.props.name : '' };
    });
  }
}

export default BoardListItem;
