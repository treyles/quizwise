import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Collection from './Collection';
import StudySession from './StudySession';
import CardForm from './CardForm';
import NotFound from './NotFound';

const App = () => (
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

export default App;
