import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';

import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ApplicationState } from './store';
import Routes from './Routes';

interface PropsFromDispatch {
  [key: string]: any;
}

interface OwnProps {
  store: Store<ApplicationState>;
  history: History;
}

type AllProps = PropsFromDispatch & OwnProps;

class App extends React.Component<AllProps> {
  constructor(props: any) {
    super(props);
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
