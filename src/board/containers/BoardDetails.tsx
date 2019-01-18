import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../store/types';
import { BoardDetailsProps, ColumnModel } from '../models/BoardDetails.model';
import Board from '../components/Board';

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
  addTask: () => null
});

class BoardDetails extends React.Component<BoardDetailsProps> {
  constructor(props: any) {
    super(props);
    this.addNewColumnHandler = this.addNewColumnHandler.bind(this);
    this.addNewTaskHandler = this.addNewTaskHandler.bind(this);
    this.renameColumnHandler = this.renameColumnHandler.bind(this);
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
          />
        )}
      </div>
    );
  }

  public addNewColumnHandler(data) {
    this.props.addColumn(data);
  }

  public addNewTaskHandler() {
    this.props.addTask();
  }

  public renameColumnHandler(data: ColumnModel) {
    this.props.updateColumn(data);
  }
}

export default connect(
  state => (state as any).board,
  mapDispatchToProps
)(BoardDetails);
