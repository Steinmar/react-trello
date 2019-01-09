import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App from './App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

import './reset.css';
import './global.css';

const history = createBrowserHistory();
const initialState = window.initialReduxState;

const store = configureStore(history, initialState);

// import { AnyAction, Store } from 'redux';

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
