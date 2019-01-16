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
    })
});

class BoardDetails extends React.Component<BoardDetailsProps> {
  constructor(props: any) {
    super(props);
    this.props.loadData(this.props.match.params.boardId);
  }

  public render() {
    return <Board />;
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(BoardDetails);
