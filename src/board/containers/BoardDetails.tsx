import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../store/types';
import {
  BoardDetailsProps,
  BoardDetailsState
} from '../models/BoardDetails.model';
import { ColumnModel } from '../models/Column.model';
import { NewTask, TaskModel } from '../../task-card/models/Task.model';
import Board from '../components/Board';
import TaskDetailsPopup from '../../task-card/containers/TaskDetailsPopup';
import DeleteColumnPopup from '../components/DeleteColumnPopup';
import { SelectedTaskStateActionTypes } from 'src/task-card/store';
import { ChangedTaskColumnInfo } from '../models/ShortTaskDraggable.model';

const mapDispatchToProps = dispatch => ({
  loadData: (id: string) =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST,
      id
    }),
  addColumn: boardId =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.ADD_COLUMN_REQUEST,
      payload: boardId
    }),
  updateColumn: (column: ColumnModel) =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.UPDATE_COLUMN_REQUEST,
      payload: column
    }),
  deleteColumn: (column: ColumnModel) =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.DELETE_COLUMN_REQUEST,
      payload: column
    }),
  addTask: (task: NewTask) =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_REQUEST,
      payload: task
    }),
  changeTaskColumn: (data: TaskModel) =>
    dispatch({
      type: SelectedTaskStateActionTypes.UPDATE_TASK_REQUEST,
      payload: data
    })
});

class BoardDetails extends React.Component<
  BoardDetailsProps,
  BoardDetailsState
> {
  constructor(props: BoardDetailsProps) {
    super(props);

    this.state = {
      shownTaskDataPopup: null,
      shownDeleteColumnPopup: false
    };

    this.addNewColumnHandler = this.addNewColumnHandler.bind(this);
    this.addNewTaskHandler = this.addNewTaskHandler.bind(this);
    this.renameColumnHandler = this.renameColumnHandler.bind(this);
    this.deleteColumnHandler = this.deleteColumnHandler.bind(this);
    this.openTaskDetailsPopup = this.openTaskDetailsPopup.bind(this);
    this.closeTaskDetailsPopup = this.closeTaskDetailsPopup.bind(this);
    this.changeTaskColumnHandler = this.changeTaskColumnHandler.bind(this);
    this.deleteColumnPopupActionHandler = this.deleteColumnPopupActionHandler.bind(
      this
    );
  }

  public componentWillMount() {
    this.props.loadData(this.props.match.params.boardId);
  }

  public render() {
    const columnProhibitedNames = this.props.data
      ? this.props.data.columns.map(column => column.name)
      : [];

    return (
      <div>
        {this.props.data && (
          <Board
            id={this.props.data.id}
            name={this.props.data.name}
            columns={this.props.data.columns}
            addNewColumn={this.addNewColumnHandler}
            addNewTask={this.addNewTaskHandler}
            renameColumn={this.renameColumnHandler}
            deleteColumn={this.deleteColumnHandler}
            columnProhibitedNames={columnProhibitedNames}
            selectTask={this.openTaskDetailsPopup}
            changeTaskColumn={this.changeTaskColumnHandler}
          />
        )}
        {this.state.shownTaskDataPopup && (
          // ToDo made a popup dumb component
          // and move all redux stuff to board details component
          <TaskDetailsPopup
            taskId={this.state.shownTaskDataPopup.taskId}
            columnId={this.state.shownTaskDataPopup.columnId}
            boardId={this.state.shownTaskDataPopup.boardId}
            closeAndSubmit={this.closeTaskDetailsPopup}
          />
        )}
        {this.state.shownDeleteColumnPopup && (
          <DeleteColumnPopup close={this.deleteColumnPopupActionHandler} />
        )}
      </div>
    );
  }

  private addNewColumnHandler(data) {
    this.props.addColumn(data);
  }

  private addNewTaskHandler(data) {
    this.props.addTask(data);
  }

  private renameColumnHandler(data: ColumnModel) {
    this.props.updateColumn(data);
  }

  private deleteColumnHandler(data: ColumnModel) {
    this.setState({ columnDataToDelete: data, shownDeleteColumnPopup: true });
  }

  private openTaskDetailsPopup(data) {
    this.setState({ shownTaskDataPopup: data });
  }

  private changeTaskColumnHandler(data: ChangedTaskColumnInfo) {
    const newColumn = this.props.data.columns.find(
      column => column.id === data.columnId
    );

    const oldColumn = this.props.data.columns.find(
      column => column.id === data.oldColumnId
    );

    if (oldColumn && newColumn) {
      const droppedTask = oldColumn.tasks.find(task => task.id === data.taskId);

      this.props.changeTaskColumn({
        ...droppedTask,
        status: newColumn.name
      });
      this.props.loadData(this.props.match.params.boardId);
    }
  }

  private closeTaskDetailsPopup(dataWasChanged: boolean) {
    // we need to do this because our single point of truth is on the backend
    // in fact we should update task data in the reducer but I don't want
    // to merge task reducer with board reducer
    if (dataWasChanged) {
      this.props.loadData(this.props.match.params.boardId);
    }
    this.setState({ shownTaskDataPopup: null });
  }

  private deleteColumnPopupActionHandler(wasApproved: boolean) {
    if (wasApproved) {
      this.props.deleteColumn(this.state.columnDataToDelete);
    }
    this.setState({ shownDeleteColumnPopup: false });
  }
}

function mapStateToProps(state) {
  return {
    ...(state as any).board,
    task: (state as any).selectTask
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardDetails);
