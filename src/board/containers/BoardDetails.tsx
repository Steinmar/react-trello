import * as React from 'react';
import { connect } from 'react-redux';
import * as types from '../store/types';
import { BoardDetailsProps } from '../models/BoardDetails.model';

const mapDispatchToProps = dispatch => ({
  loadData: (id: string) =>
    dispatch({ type: types.BoardDetailsStateActionTypes.FETCH_REQUEST, id })
});

class BoardDetails extends React.Component<BoardDetailsProps> {
  constructor(props: any) {
    super(props);
    this.props.loadData(this.props.match.params.boardId);
  }

  public render() {
    return <span>Board page</span>;
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(BoardDetails);
