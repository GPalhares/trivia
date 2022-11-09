import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
// import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          {/* <Route path="/carteira" component={ Wallet } /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
