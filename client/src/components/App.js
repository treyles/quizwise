/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Collection from './Collection';
import StudySession from './StudySession';
import CardForm from './CardForm';
import NotFound from './NotFound';
// import { connect } from 'react-redux';

// import { fetchCards } from '../actions/';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/collection/:id" component={Collection} />
          <Route path="/study/:id" component={StudySession} />
          <Route path="/form" component={CardForm} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

// App.propTypes = {
//   fetchCards: PropTypes.func.isRequired
// };

// export default connect(null, { fetchCards })(App);
export default App;
