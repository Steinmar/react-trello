import * as React from 'react';
import { connect } from 'react-redux';
import { LoginStateActionTypes } from 'src/auth/store';

import HeaderItem from '../components/HeaderItem';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LoginStateActionTypes.FETCH_LOGOUT_REQUEST })
});

interface PropsFromDispatch {
  [key: string]: any;
}

class Header extends React.Component<PropsFromDispatch> {
  constructor(props: any) {
    super(props);

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  public render() {
    return (
      <HeaderItem
        name={this.props.login.data.name}
        logout={this.logoutHandler}
      />
    );
  }

  private logoutHandler() {
    this.props.logout();
  }
}

export default connect(
  state => state,
  mapDispatchToProps
)(Header);
