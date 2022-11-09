import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
// import Header from './Components/Header';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          {/* <Route path="/carteira" component={ Header } /> */}
        </Switch>
      </main>
    );
  }
}

export default App;
