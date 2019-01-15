import * as React from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({});

class BoardContainer extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <span>Board page</span>;
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(BoardContainer);
