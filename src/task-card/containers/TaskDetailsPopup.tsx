import * as React from 'react';
import Popup from 'src/shared/components/Popup';
import TaskDetailsBody from '../components/TaskDetailsBody';
import {
  TaskDetailPopupProps,
  TaskDetailPopupState
} from '../models/TaskDetailsPopup.model';
import { connect } from 'react-redux';
import { SelectedTaskStateActionTypes } from '../store';
import { TaskModel } from '../models';
import * as _ from 'lodash';
import Spinner from 'src/shared/components/Spinner';

const mapDispatchToProps = dispatch => ({
  loadData: (payload: TaskModel) =>
    dispatch({
      type: SelectedTaskStateActionTypes.GET_TASK_REQUEST,
      payload
    }),
  clearSelectedTask: () =>
    dispatch({
      type: SelectedTaskStateActionTypes.CLEAR_SELECTED_TASK
    }),
  updateTask: payload =>
    dispatch({
      type: SelectedTaskStateActionTypes.UPDATE_TASK_REQUEST,
      payload
    }),
  deleteTask: payload =>
    dispatch({
      type: SelectedTaskStateActionTypes.DELETE_TASK_REQUEST,
      payload
    })
});

class TaskDetailsPopup extends React.Component<
  TaskDetailPopupProps,
  TaskDetailPopupState
> {
  constructor(props: TaskDetailPopupProps) {
    super(props);

    this.state = {
      changes: null
    };

    this.taskDataChangeHandler = this.taskDataChangeHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
    this.deleteTaskHandler = this.deleteTaskHandler.bind(this);
  }

  public componentWillReceiveProps(props: TaskDetailPopupProps) {
    if (!!props.removedTask || (this.state.changes && !props.loading)) {
      this.props.closeAndSubmit(true);
    }
  }

  public componentWillMount() {
    if (this.props.loadData) {
      this.props.loadData({
        taskId: this.props.taskId,
        columnId: this.props.columnId,
        boardId: this.props.boardId
      });
    }
  }

  public componentWillUnmount() {
    if (this.props.clearSelectedTask) {
      this.props.clearSelectedTask();
    }
  }

  public render() {
    const {
      name,
      description,
      status,
      availableStatuses
    } = this.getTaskDetailBodyProps();

    const spinner = this.props.loading ? (
      <Spinner hasOverlay={true} startDelay={300} />
    ) : null;

    return (
      <div>
        {spinner}
        <Popup closeHandler={this.closeHandler}>
          {this.props.data && (
            <TaskDetailsBody
              name={name}
              description={description}
              status={status}
              availableStatuses={availableStatuses}
              dataChanged={this.taskDataChangeHandler}
              deleteTask={this.deleteTaskHandler}
            />
          )}
        </Popup>
      </div>
    );
  }

  private taskDataChangeHandler(data) {
    this.setState(state => ({ changes: { ...state.changes, ...data } }));
  }

  private getTaskDetailBodyProps() {
    let name;
    let description;
    let status;
    let availableStatuses: string[] = [];

    if (this.props.data) {
      name = this.props.data.task.name;
      description = this.props.data.task.description;
      status = this.props.data.task.status;
      availableStatuses = this.props.data.statuses;
    }
    return { name, description, status, availableStatuses };
  }

  private closeHandler() {
    if (!this.state.changes) {
      this.props.closeAndSubmit(false);
    } else if (this.props.data && this.state.changes && this.props.updateTask) {
      this.props.updateTask(
        _.merge({}, this.props.data.task, this.state.changes)
      );
    }
  }

  private deleteTaskHandler() {
    if (this.props.deleteTask) {
      this.props.deleteTask({
        id: this.props.taskId,
        columnId: this.props.columnId,
        boardId: this.props.boardId
      });
    }
  }
}

function mapStateToProps(state) {
  return state.selectedTask;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetailsPopup);
