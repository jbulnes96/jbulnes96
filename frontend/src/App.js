import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}
export default App;