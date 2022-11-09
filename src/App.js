import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Config from './Pages/Config';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/config" component={ Config } />
          {/* <Route path="/carteira" component={ Wallet } /> */}

          {/* <Route path="/carteira" component={ Header } /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
