import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

const store: any = {};
const history: any = {};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
