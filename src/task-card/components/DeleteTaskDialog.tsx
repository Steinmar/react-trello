import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  IconButton,
  Icon,
  Grid
} from '@material-ui/core';
import {
  DeleteTaskDialogProps,
  DeleteTaskDialogState
} from '../models/DeleteTaskDialog.model';
import { StyleSheet, css } from 'aphrodite';

const iconMarginCompensation = '12px';
const styles = StyleSheet.create({
  dialogBackground: {
    background: '#fff'
  },
  dialogContainer: {
    'margin-bottom': iconMarginCompensation
  },
  icon: {
    'margin-bottom': `-${iconMarginCompensation}`
  },
  itemContainer: {
    display: 'flex',
    'align-items': 'flex-end'
  },
  inputContainer: {
    height: '48px'
  }
});

class DeleteTaskDialog extends React.Component<
  DeleteTaskDialogProps,
  DeleteTaskDialogState
> {
  constructor(props: DeleteTaskDialogProps) {
    super(props);

    this.state = {
      taskName: '',
      showDialog: false,
      nameMatchingError: false
    };

    this.deleteTaskButtonClickHander = this.deleteTaskButtonClickHander.bind(
      this
    );
    this.onTaskNameChangeHandler = this.onTaskNameChangeHandler.bind(this);
    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onUndoDeleteTask = this.onUndoDeleteTask.bind(this);
  }

  public render() {
    return (
      <div>
        {!this.state.showDialog ? (
          <Button color="secondary" onClick={this.deleteTaskButtonClickHander}>
            Delete task
          </Button>
        ) : (
          <div className={css(styles.dialogContainer)}>
            <Typography component="p" variant="subtitle1">
              Are you sure you want to delete this task?
              <br />
              If yes please enter task name and press submit button
            </Typography>
            <Grid container={true}>
              <Grid
                item={true}
                className={css(styles.itemContainer, styles.inputContainer)}
              >
                <TextField
                  error={this.state.nameMatchingError}
                  label={
                    this.state.nameMatchingError ? "Names didn't match!" : null
                  }
                  placeholder="Task name"
                  type="text"
                  value={this.state.taskName}
                  onChange={this.onTaskNameChangeHandler}
                  onKeyDown={this.onKeyDownHandler}
                  margin="none"
                />
              </Grid>
              <Grid item={true} className={css(styles.itemContainer)}>
                <IconButton
                  onClick={this.onDeleteClickHandler}
                  className={css(styles.icon)}
                >
                  <Icon>delete_sweep</Icon>
                </IconButton>
                <IconButton
                  aria-label="Undo"
                  onClick={this.onUndoDeleteTask}
                  className={css(styles.icon)}
                >
                  <Icon>undo</Icon>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }

  private deleteTaskButtonClickHander() {
    this.setState({ showDialog: true });
    this.props.dialogActivated(true);
  }

  private onTaskNameChangeHandler(event) {
    this.setState({ taskName: event.target.value });
  }

  private onDeleteClickHandler() {
    if (this.state.taskName === this.props.taskName) {
      this.props.deleteTask();
      this.props.dialogActivated(false);
    } else {
      this.setState({ nameMatchingError: true });
    }
  }

  private onKeyDownHandler(event) {
    if (event.key === 'Enter') {
      this.onDeleteClickHandler();
    }
  }

  private onUndoDeleteTask() {
    this.setState({ showDialog: false });
    this.props.dialogActivated(false);
  }
}

export default DeleteTaskDialog;
