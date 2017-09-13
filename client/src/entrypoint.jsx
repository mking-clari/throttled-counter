import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/configureStore';
import Example from './components/Example';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('content')
);
