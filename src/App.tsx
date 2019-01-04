import * as React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import BoardList from './board/containers/BoardList';
import { ConditionalRoute } from './core/ConditionalRoute';
import StartPage from './shared/components/StartPage';
import Signup from './auth/containers/Signup';
import { ROUTES } from './core/Routes';

class App extends React.Component<{}, { loggedIn: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  public render() {
    return (
      <Router>
        <Switch>
          {/* <Route path="/login" component={MyLoginForm} /> */}
          <Route
            exact={true}
            path="/"
            // tslint:disable-next-line jsx-no-lambda
            render={() =>
              this.state.loggedIn ? (
                <Redirect to={ROUTES.BOARDS.LIST} />
              ) : (
                <StartPage />
              )
            }
          />
          <ConditionalRoute
            path={ROUTES.AUTH.SIGN_UP}
            component={Signup}
            routeCondition={!this.state.loggedIn}
            redirectTo={ROUTES.ROOT_PAGE}
          />
          <ConditionalRoute
            path={ROUTES.BOARDS.LIST}
            component={BoardList}
            routeCondition={this.state.loggedIn}
            redirectTo={ROUTES.ROOT_PAGE}
          />
          <Route
            exact={true}
            path="*"
            // tslint:disable-next-line jsx-no-lambda
            render={() => <Redirect to="/" />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
