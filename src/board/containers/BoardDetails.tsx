import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../store/types';
import {
  BoardDetailsProps,
  BoardDetailsState
} from '../models/BoardDetails.model';
import { ColumnModel } from '../models/Column.model';
import { NewTask } from '../../task-card/models/Task.model';
import Board from '../components/Board';
import TaskDetailsPopup from '../../task-card/containers/TaskDetailsPopup';

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
  addTask: (task: NewTask) =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.ADD_TASK_TO_COLUMN_REQUEST,
      payload: task
    })
});

class BoardDetails extends React.Component<
  BoardDetailsProps,
  BoardDetailsState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      shownTaskData: null
    };

    this.addNewColumnHandler = this.addNewColumnHandler.bind(this);
    this.addNewTaskHandler = this.addNewTaskHandler.bind(this);
    this.renameColumnHandler = this.renameColumnHandler.bind(this);
    this.openTaskDetailsPopup = this.openTaskDetailsPopup.bind(this);
    this.closeTaskDetailsPopup = this.closeTaskDetailsPopup.bind(this);
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
            columnProhibitedNames={columnProhibitedNames}
            selectTask={this.openTaskDetailsPopup}
          />
        )}
        {this.state.shownTaskData && (
          // ToDo made a popup dumb component
          // and move all redux stuff to board details component
          <TaskDetailsPopup
            taskId={this.state.shownTaskData.taskId}
            columnId={this.state.shownTaskData.columnId}
            boardId={this.state.shownTaskData.boardId}
            closeAndSubmit={this.closeTaskDetailsPopup}
          />
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

  private openTaskDetailsPopup(data) {
    this.setState({ shownTaskData: data });
  }

  private closeTaskDetailsPopup() {
    // we need to do this because our single point of truth is on the backend
    // in fact we should update task data in the reducer but I don't want
    // to merge task reducer with board reducer
    this.props.loadData(this.props.match.params.boardId);
    this.setState({ shownTaskData: null });
  }
}

export default connect(
  state => (state as any).board,
  mapDispatchToProps
)(BoardDetails);
