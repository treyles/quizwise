import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Collection from './Collection';
import Study from './Study';
import { connect } from 'react-redux';

import { fetchCards } from '../actions/';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchCards();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Collection} />
          <Route path="/study" component={Study} />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchCards: PropTypes.func.isRequired
};

export default connect(null, { fetchCards })(App);
