import { applyMiddleware, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';
import thunk from 'redux-thunk';

import requestsEpic from '../epics';
import requestsReducer from '../reducers';

export default function configureStore() {
  const rootReducer = combineReducers({
    requests: requestsReducer,
  });

  const rootEpic = combineEpics(
    requestsEpic,
  );

  const epicMiddleware = createEpicMiddleware(rootEpic);

  return createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(
      thunk,
      epicMiddleware,
    ))
  );
}