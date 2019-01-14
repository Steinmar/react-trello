import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../store/types';
import BoardList from '../components/BoardList';
import { BoardListModel } from '../models/BoardList.model';
import { BoardListItem } from '../models/BoardList.model';

const mapDispatchToProps = dispatch => ({
  getBoardList: () =>
    dispatch({ type: types.BoardListStateActionTypes.FETCH_REQUEST }),
  addBoard: payload =>
    dispatch({
      type: types.BoardListStateActionTypes.CREATE_ITEM_REQUEST,
      payload
    }),
  updateBoard: payload =>
    dispatch({
      type: types.BoardListStateActionTypes.UPDATE_ITEM_REQUEST,
      payload
    }),
  deleteBoard: payload =>
    dispatch({
      type: types.BoardListStateActionTypes.DELETE_ITEM_REQUEST,
      payload
    })
});

class BoardListContainer extends React.Component<
  {
    getBoardList: () => any;
    addBoard: (payload) => any;
    updateBoard: (payload) => any;
    deleteBoard: (payload) => any;
    boards: types.BoardListState;
  },
  BoardListModel
> {
  constructor(props: any) {
    super(props);

    this.addBoardHandler = this.addBoardHandler.bind(this);
    this.updateBoardHandler = this.updateBoardHandler.bind(this);
    this.deleteBoardHandler = this.deleteBoardHandler.bind(this);
  }

  public render() {
    return (
      <BoardList
        list={this.props.boards.data}
        error={this.props.boards.error}
        addBoard={this.addBoardHandler}
        updateBoard={this.updateBoardHandler}
        deleteBoard={this.deleteBoardHandler}
      />
    );
  }

  public componentWillMount() {
    this.props.getBoardList();
    console.log('get board list');
  }

  public addBoardHandler() {
    this.props.addBoard(`Board ${this.props.boards.data.length + 1}`);
  }

  public updateBoardHandler(item: BoardListItem) {
    this.props.updateBoard(item);
  }

  public deleteBoardHandler(event) {
    console.log(event);
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(BoardListContainer);
