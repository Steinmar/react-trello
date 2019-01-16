import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../store/types';
import { BoardDetailsProps } from '../models/BoardDetails.model';
import Board from '../components/Board';

const mapDispatchToProps = dispatch => ({
  loadData: (id: string) =>
    dispatch({
      type: types.BoardDetailsStateActionTypes.FETCH_DETAILS_REQUEST,
      id
    }),
  addColumn: () => null,
  addTask: () => null
});

class BoardDetails extends React.Component<BoardDetailsProps> {
  constructor(props: any) {
    super(props);
    this.props.loadData(this.props.match.params.boardId);
    this.addNewColumnHandler = this.addNewColumnHandler.bind(this);
    this.addNewTaskHandler = this.addNewTaskHandler.bind(this);
  }

  public render() {
    return (
      <Board
        id={this.props.data.id}
        name={this.props.data.name}
        columns={this.props.data.columns}
        addNewColumn={this.addNewColumnHandler}
        addNewTask={this.addNewTaskHandler}
      />
    );
  }

  public addNewColumnHandler() {
    this.props.addColumn();
  }

  public addNewTaskHandler() {
    this.props.addTask();
  }
}

export default connect(
  state => (state as any).board,
  mapDispatchToProps
)(BoardDetails);
