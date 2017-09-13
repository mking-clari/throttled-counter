import uuidv4 from 'uuid/v4';

import ActionTypes from '../constants/ActionTypes';

export function startRequest() {
  return {
    type: ActionTypes.START_REQUEST,
    id: uuidv4(),
    startTime: Date.now(),
  };
}

export function endRequest({
  id,
  counter,
}) {
  return {
    type: ActionTypes.END_REQUEST,
    id,
    endTime: Date.now(),
    counter,
  };
}
