import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/config" component={ Config } />
          <Route path="/feedback" component={ Feedback } />

          {/* <Route path="/carteira" component={ Header } /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
