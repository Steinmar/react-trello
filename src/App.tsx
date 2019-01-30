import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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
      // We need to move DragDropContextProvider outside the router because of dnd error
      // more details is here https://github.com/react-dnd/react-dnd/issues/186#issuecomment-453990887
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </DragDropContextProvider>
    );
  }
}

export default App;
