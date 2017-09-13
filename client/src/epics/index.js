import axios from 'axios';
import Promise from 'bluebird';

import ActionTypes from '../constants/ActionTypes';
import { endRequest } from '../actions';

const requestsEpic = action$ =>
  action$.ofType(ActionTypes.START_REQUEST)
    .map(action => {
      return Promise.resolve(axios({
        url: 'http://localhost:8090',
      })).then(response => {
        return endRequest({
          id: action.id,
          counter: response.data.counter,
        });
      });
    })
    .switchMap(action => action);

export default requestsEpic;
