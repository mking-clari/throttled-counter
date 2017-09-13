import axios from 'axios';
import Immutable from 'immutable';
import moment from 'moment';
import Promise from 'bluebird';
import React from 'react';
import uuidv4 from 'uuid/v4';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: Immutable.Map(),
    };
  }

  getCompleted() {
    return this.getRequests()
      .filter(request => !!request.get('endTime'));
  }
  
  getRequests() {
    return this.state.requests
      .valueSeq()
      .sortBy(request => request.get('startTime'))
      .toList();
  }

  sendRequest() {
    const id = uuidv4();
    this.setState(state => ({
      requests: state.requests.set(id, Immutable.Map({
        id,
        startTime: Date.now(),
      })),
    }));

    Promise.resolve(axios({
      url: 'http://localhost:8090',
    })).then(response => {
      this.setState(state => ({
        requests: state.requests.update(id, request =>
          request.merge({
            endTime: Date.now(),
            counter: response.data.counter,
          })
        ),
      }));
    });
  }

  render() {
    const completed = this.getCompleted();
    const requests = this.getRequests();

    return (
      <div className="container">
        <p>
          <button
            className="btn btn-primary"
            onClick={() => this.sendRequest()}
            type="button"
          >
            Send Request
          </button>
        </p>
        <hr />
        <h1>Current Value</h1>
        <p>{completed.isEmpty() ? 'No Value' : completed.last().get('counter')}</p>
        <hr />
        <h1>Requests</h1>
        <table className="table">
          <thead>
            <tr>
              <th>
                Start Time
              </th>
              <th>
                End Time
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, i) => (
              <tr key={i}>
                <td>
                  {moment(request.get('startTime')).format('hh:mm:ss A')}
                </td>
                <td>
                  {request.get('endTime') ? moment(request.get('endTime')).format('hh:mm:ss A') : 'Loading...'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
