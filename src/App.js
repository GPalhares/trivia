import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import './styles/Background.css';

class App extends Component {
  render() {
    return (
      <main className="background">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/game" component={ Game } />
          <Route exact path="/config" component={ Config } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />

        </Switch>
      </main>
    );
  }
}

export default App;
