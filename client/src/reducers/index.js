import Immutable from 'immutable';

import ActionTypes from '../constants/ActionTypes';

export default function reducer(
  state = Immutable.Map({
    requests: Immutable.Map(),
  }),
  action
) {
  switch (action.type) {
    case ActionTypes.END_REQUEST: {
      return state.updateIn(['requests', action.id], request =>
        request.merge({
          endTime: action.endTime,
          counter: action.counter,
        })
      );
    }

    case ActionTypes.START_REQUEST: {
      return state.setIn(['requests', action.id], Immutable.Map({
        id: action.id,
        startTime: action.startTime,
      }));
    }

    default: {
      return state;
    }
  }
}