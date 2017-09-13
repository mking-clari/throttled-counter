import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';
import thunk from 'redux-thunk';

import requestsReducer from '../reducers';

export default function configureStore() {
  const reducer = combineReducers({
    requests: requestsReducer,
  });

  return createStore(
    reducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
  );
}