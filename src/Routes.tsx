import * as React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import { History } from 'history';

import { connect } from 'react-redux';

import { Store } from 'redux';

import { ConditionalRoute } from './core/ConditionalRoute';
import { ROUTES } from './core/Routes';

import { ApplicationState } from './store';

import Login from './auth/containers/Login';
import Signup from './auth/containers/Signup';
import StartPage from './shared/components/StartPage';
import BoardList from './board/containers/BoardList';

interface PropsFromDispatch {
  [key: string]: any;
}

interface OwnProps {
  store: Store<ApplicationState>;
  history: History;
}

// TODO think about this and refactor it
type AllProps = PropsFromDispatch & OwnProps;

class Routes extends React.Component<AllProps> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact={true}
            path="/"
            // tslint:disable-next-line jsx-no-lambda
            render={() =>
              this.props.loggedIn ? (
                <Redirect to={ROUTES.BOARDS.LIST} />
              ) : (
                <StartPage />
              )
            }
          />
          <ConditionalRoute
            path={ROUTES.AUTH.LOGIN}
            component={Login}
            routeCondition={!this.props.loggedIn}
            redirectTo={ROUTES.ROOT_PAGE}
          />
          <ConditionalRoute
            path={ROUTES.AUTH.SIGN_UP}
            component={Signup}
            routeCondition={!this.props.loggedIn}
            redirectTo={ROUTES.ROOT_PAGE}
          />
          <ConditionalRoute
            path={ROUTES.BOARDS.LIST}
            component={BoardList}
            routeCondition={this.props.loggedIn}
            redirectTo={ROUTES.ROOT_PAGE}
          />
          <Route
            exact={true}
            path="*"
            // tslint:disable-next-line jsx-no-lambda
            render={() => <Redirect to="/" />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loggedIn: !!state.login.data.email
});
export default connect(mapStateToProps)(Routes);
