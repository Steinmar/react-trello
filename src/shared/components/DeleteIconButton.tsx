import * as React from 'react';
import { IconButton, Icon } from '@material-ui/core';

export interface DeleteIconButtonProps {
  id: string;
  deleteFunction: (id: string) => void;
}

class DeleteIconButton extends React.Component<DeleteIconButtonProps> {
  constructor(props: DeleteIconButtonProps) {
    super(props);

    this.deleteHandler = this.deleteHandler.bind(this);
  }

  public render() {
    return (
      <IconButton aria-label="Delete" onClick={this.deleteHandler}>
        <Icon>delete</Icon>
      </IconButton>
    );
  }

  private deleteHandler() {
    this.props.deleteFunction(this.props.id);
  }
}

export default DeleteIconButton;
