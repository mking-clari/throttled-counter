import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import React from 'react';

import { completedSelector, isLoading, oldestSelector } from '../selectors';
import { startRequest } from '../actions';

class Example extends React.Component {
  render() {
    const { completed, startRequest: startRequestProp } = this.props;

    return (
      <div className="container">
        <p>
          <button
            className="btn btn-primary"
            onClick={() => startRequestProp()}
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
        {this.renderTable()}
      </div>
    );
  }

  renderTable() {
    const { oldest } = this.props;

    return (
      <table className="table">
        <thead>
          <tr>
            <th>
              Start Time
            </th>
            <th>
              End Time
            </th>
            <th>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {oldest.map((request, i) => (
            <tr key={i}>
              <td>
                {moment(request.get('startTime')).format('hh:mm:ss A')}
              </td>
              <td>
                {isLoading(request) ? 'Loading...' : moment(request.get('endTime')).format('hh:mm:ss A')}
              </td>
              <td>
                {isLoading(request) ? null : request.get('counter')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const selector = createStructuredSelector({
  completed: completedSelector,
  oldest: oldestSelector,
});

export default connect(selector, {
  startRequest,
})(Example);