import * as React from 'react';

import { Button, TextField } from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  wrapper: {
    width: '170px'
  }
});

class NewBoardItemDialog extends React.Component<
  { type: string; saveNewName: () => void },
  { showInput: boolean; name: string }
> {
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
  }

  public render() {
    return (
      <div className={css(styles.wrapper)}>
        {this.state.showInput ? (
          <div>
            <TextField
              label="Name"
              value={this.state.name}
              onChange={this.changeNameHandler}
            />
            <Button onClick={this.cancelAddingHandler}>Cancel</Button>
            <Button
              disabled={this.state.name.length < 1}
              onClick={this.saveNewNameHandler}
            >
              Save
            </Button>
          </div>
        ) : (
          <Button onClick={this.addingNewItemHandler}>
            Add {this.props.type}
          </Button>
        )}
      </div>
    );
  }

  public changeNameHandler(event) {
    this.setState({ name: event.target.value });
  }

  public cancelAddingHandler() {
    this.setState({ showInput: false });
  }

  public saveNewNameHandler() {
    this.setState({ showInput: false });
    this.props.saveNewName();
  }

  public addingNewItemHandler() {
    this.setState({ showInput: true });
  }
}

export default NewBoardItemDialog;
