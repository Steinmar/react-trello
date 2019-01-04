import * as React from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'; /* Link, Route */
import BoardList from './board/containers/BoardList';
import { ConditionalRoute } from './core/ConditionalRoute';
import StartPage from './shared/components/StartPage';

class App extends React.Component<{}, { loggedIn: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedIn: true
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
                <Redirect to="/board-list" />
              ) : (
                <StartPage />
              )
            }
          />
          <ConditionalRoute
            path="/board-list"
            component={BoardList}
            routeCondition={this.state.loggedIn}
            redirectTo="/"
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
