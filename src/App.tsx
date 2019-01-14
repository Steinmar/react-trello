import * as React from 'react';
// import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import { Provider } from 'react-redux';

import { Store } from 'redux';

// import { ConditionalRoute } from './core/ConditionalRoute';
// import { ROUTES } from './core/Routes';

import { ApplicationState } from './store';

// import Login from './auth/containers/Login';
// import Signup from './auth/containers/Signup';
// import StartPage from './shared/components/StartPage';
// import BoardList from './board/containers/BoardList';

import Routes from './Routes';

interface PropsFromDispatch {
  [key: string]: any;
}

interface OwnProps {
  store: Store<ApplicationState>;
  history: History;
}

type AllProps = PropsFromDispatch & OwnProps;

// const loggedIn = false; // temp

class App extends React.Component<AllProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  public render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes />
          {/* <Switch>
            <Route
              exact={true}
              path="/"
              // tslint:disable-next-line jsx-no-lambda
              render={() =>
                loggedIn ? <Redirect to={ROUTES.BOARDS.LIST} /> : <StartPage />
              }
            />
            <ConditionalRoute
              path={ROUTES.AUTH.LOGIN}
              component={Login}
              routeCondition={!loggedIn}
              redirectTo={ROUTES.ROOT_PAGE}
            />
            <ConditionalRoute
              path={ROUTES.AUTH.SIGN_UP}
              component={Signup}
              routeCondition={!loggedIn}
              redirectTo={ROUTES.ROOT_PAGE}
            />
            <ConditionalRoute
              path={ROUTES.BOARDS.LIST}
              component={BoardList}
              routeCondition={loggedIn}
              redirectTo={ROUTES.ROOT_PAGE}
            />
            <Route
              exact={true}
              path="*"
              // tslint:disable-next-line jsx-no-lambda
              render={() => <Redirect to="/" />}
            />
          </Switch> */}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
