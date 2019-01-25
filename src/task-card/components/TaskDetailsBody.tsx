import * as React from 'react';
import EditableTitle from 'src/shared/components/EditableTitle';
import { TaskDetailsBodyProps, TaskDetailsBodyState } from '../models';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    'max-width': '500px'
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
      name: props.name,
      description: props.description
    };
    this.editTaskNameHandler = this.editTaskNameHandler.bind(this);
    this.editTaskDescriptionHandler = this.editTaskDescriptionHandler.bind(
      this
    );
    this.onSelectChangeHandler = this.onSelectChangeHandler.bind(this);
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

    const statusesList = this.props.availableStatuses.map(status => (
      <MenuItem key={status} value={status}>
        {status}
      </MenuItem>
    ));

    return (
      <div className={css(styles.container)}>
        <EditableTitle
          id={''}
          title={this.state.name as string}
          editTitle={this.editTaskNameHandler}
        >
          <Typography variant="h6" color="inherit">
            {this.state.name}
          </Typography>
        </EditableTitle>
        <EditableTitle
          id={''}
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

  private onSelectChangeHandler(event) {
    const changes = { status: event.target.value };
    this.setState(changes);
    this.props.dataChanged(changes);
  }
}

export default TaskDetailsBody;
