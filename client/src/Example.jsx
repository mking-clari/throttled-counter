import axios from 'axios';
import Promise from 'bluebird';
import React from 'react';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      isLoading: false,
    };
  }

  loadCounter() {
    this.setState({
      isLoading: true,
    });
    Promise.resolve(axios({
      url: 'http://localhost:8090',
    })).then(response => {
      this.setState({
        counter: response.data.counter,
        isLoading: false,
      });
    });
  }

  render() {
    const { counter, isLoading } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="panel panel-default">
              <div className="panel-body">
                <h1>
                  {isLoading ? 'Loading...' : counter}
                </h1>
                <p>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.loadCounter()}
                    type="button"
                  >
                    Load Counter
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
