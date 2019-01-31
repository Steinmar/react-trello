import * as React from 'react';
import EditableTitle from 'src/shared/components/EditableTitle';
import DeleteTaskDialog from './DeleteTaskDialog';
import { TaskDetailsBodyProps, TaskDetailsBodyState } from '../models';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid
} from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite/no-important';

const buttonIndent = '10px';

const styles = StyleSheet.create({
  container: {
    'max-width': '500px'
  },
  deleteTaskDialog: {
    position: 'absolute',
    bottom: buttonIndent,
    right: buttonIndent,
    margin: `0 ${buttonIndent}`
  }
});

class TaskDetailsBody extends React.Component<
  TaskDetailsBodyProps,
  TaskDetailsBodyState
> {
  constructor(props: TaskDetailsBodyProps) {
    super(props);

    this.state = {
      status: props.status as string,
      name: props.name as string,
      description: props.description,
      isEditableDisabled: false
    };
    this.editTaskNameHandler = this.editTaskNameHandler.bind(this);
    this.editTaskDescriptionHandler = this.editTaskDescriptionHandler.bind(
      this
    );
    this.onSelectChangeHandler = this.onSelectChangeHandler.bind(this);
    this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
    this.deleteDialogActivatedHander = this.deleteDialogActivatedHander.bind(
      this
    );
  }

  public render() {
    let taskDescriptionComponent;

    if (this.state.description) {
      taskDescriptionComponent = (
        <Typography component="p" color="inherit">
          {this.state.description}
        </Typography>
      );
    } else {
      taskDescriptionComponent = (
        <Typography variant="caption" component="p" color="inherit">
          Description
        </Typography>
      );
    }

    const statusesList = (this.props.availableStatuses || []).map(status => (
      <MenuItem key={status} value={status}>
        {status}
      </MenuItem>
    ));

    return (
      <div className={css(styles.container)}>
        <Grid container={true} direction="column">
          <Grid item={true}>
            <Grid item={true}>
              <EditableTitle
                id={''}
                disabled={this.state.isEditableDisabled}
                title={this.state.name as string}
                editTitle={this.editTaskNameHandler}
              >
                <Typography variant="h6" color="inherit">
                  {this.state.name}
                </Typography>
              </EditableTitle>
              <EditableTitle
                id={''}
                disabled={this.state.isEditableDisabled}
                rowsMax={3}
                placeholder={'Description'}
                emptyIsAllowed={true}
                title={this.state.description || ''}
                editTitle={this.editTaskDescriptionHandler}
              >
                {taskDescriptionComponent}
              </EditableTitle>
              <FormControl>
                <InputLabel htmlFor="task-status">Status</InputLabel>
                <Select
                  disabled={this.state.isEditableDisabled}
                  value={this.state.status}
                  onChange={this.onSelectChangeHandler}
                  inputProps={{
                    name: 'status',
                    id: 'task-status'
                  }}
                >
                  {statusesList}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item={true}>
            <div className={css(styles.deleteTaskDialog)}>
              <DeleteTaskDialog
                taskName={this.state.name as string}
                deleteTask={this.deleteTaskHandler}
                dialogActivated={this.deleteDialogActivatedHander}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  private editTaskNameHandler(data) {
    const changes = { name: data.name };
    this.setState(changes);
    this.props.dataChanged(changes);
  }

  private editTaskDescriptionHandler(data) {
    const changes = { description: data.name };
    this.setState(changes);
    this.props.dataChanged(changes);
  }

  private deleteTaskHandler() {
    this.props.deleteTask();
  }

  private onSelectChangeHandler(event) {
    const changes = { status: event.target.value };
    this.setState(changes);
    this.props.dataChanged(changes);
  }

  private deleteDialogActivatedHander(isActive: boolean) {
    this.setState({ isEditableDisabled: isActive });
  }
}

export default TaskDetailsBody;
