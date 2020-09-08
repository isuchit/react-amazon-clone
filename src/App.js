import React from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (

    //BEM Convention

    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
