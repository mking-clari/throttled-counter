import axios from 'axios';
import Immutable from 'immutable';
import Promise from 'bluebird';
import uuidv4 from 'uuid/v4';

import ActionTypes from '../constants/ActionTypes';

export function startRequest({
  id,
}) {
  return {
    type: ActionTypes.START_REQUEST,
    id,
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

export function sendRequest() {
  return dispatch => {
    const id = uuidv4();
    dispatch(startRequest({
      id,
    }));

    return Promise.resolve(axios({
      url: 'http://localhost:8090',
    })).then(response => {
      dispatch(endRequest({
        id,
        counter: response.data.counter,
      }));
    });
  };
}
