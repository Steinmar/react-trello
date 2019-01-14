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
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
