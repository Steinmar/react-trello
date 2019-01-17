import * as React from 'react';

import { Button, TextField, Icon } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';

import {
  BoardItemDialogProps,
  BoardItemDialogState
} from '../models/BoardItemDialog.model';

const styles = StyleSheet.create({
  editButtonsContainer: {
    display: 'flex',
    'justify-content': 'space-between'
  },
  button: {
    'white-space': 'nowrap'
  }
});

class NewBoardItemDialog extends React.Component<
  BoardItemDialogProps,
  BoardItemDialogState
> {
  private emitChangedName: (name: string) => void;

  constructor(props: any) {
    super(props);

    this.state = {
      showInput: false,
      name: ''
    };

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.cancelAddingHandler = this.cancelAddingHandler.bind(this);
    this.addingNewItemHandler = this.addingNewItemHandler.bind(this);
    this.saveNewNameHandler = this.saveNewNameHandler.bind(this);

    this.emitChangedName = this.props.newNameChanged
      ? (name: string) => (this.props as any).newNameChanged(name)
      : // tslint:disable:no-empty
        (name: string) => {};
  }

  public render() {
    return (
      <div>
        {this.state.showInput ? (
          <div>
            <div>
              <TextField
                label="Name"
                value={this.state.name}
                onChange={this.changeNameHandler}
              />
            </div>
            <div className={css(styles.editButtonsContainer)}>
              <Button
                className={css(styles.button)}
                onClick={this.cancelAddingHandler}
              >
                Cancel
              </Button>
              <Button
                className={css(styles.button)}
                disabled={this.isSaveButtonDisabled()}
                onClick={this.saveNewNameHandler}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            className={css(styles.button)}
            onClick={this.addingNewItemHandler}
          >
            <span>Add {this.props.type}</span>
            <Icon>add</Icon>
          </Button>
        )}
      </div>
    );
  }

  private changeNameHandler(event) {
    const name = event.target.value;
    this.setState({ name });
    this.emitChangedName(name);
  }

  private cancelAddingHandler() {
    this.setState({ showInput: false });
  }

  private saveNewNameHandler() {
    this.setState({ showInput: false });
    this.props.saveNewName();
  }

  private addingNewItemHandler() {
    this.setState({ showInput: true });
  }

  private isNewNameAllowed(name: string) {
    const bookedNames = this.props.bookedNames || [];
    return bookedNames.includes(name);
  }

  private isSaveButtonDisabled() {
    const name = this.state.name;
    return name.length < 1 || this.isNewNameAllowed(name);
  }
}

export default NewBoardItemDialog;
