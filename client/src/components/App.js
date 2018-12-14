/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Collection from './Collection';
import Study from './Study';
import CardForm from './CardForm';
// import { connect } from 'react-redux';

// import { fetchCards } from '../actions/';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Collection} />
          <Route path="/study" component={Study} />
          <Route path="/form" component={CardForm} />
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
