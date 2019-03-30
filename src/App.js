import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './router';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import './App.css';

class App extends Component {
  state = {
    userEmail: '',
    error: null
  };

  handleLogin = async (email, password, history) => {
    const body = JSON.stringify({ workEmail: email, password });
    const response = await fetch ('https://rmarket-backend.herokuapp.com/login', {
      method: 'POST',
      body,
      headers: {
        'Content-type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('Error!')
    }

    // console.log('response:', await response.json());

    window.sessionStorage.setItem('login', email);
    this.setState({ userEmail: email });
    history.push(`/dashboard/c8617717-61c8-455e-aa33-3710bffab2b9`); // TODO: Load id from user info
  };

  render() {
    const isAuthenticated = window.sessionStorage.getItem('login') != null;

    return (
      <div className="App">
        <Router>
          <Route path="/" exact render={props => (
            <Login onLogin={(email, password) => this.handleLogin(email, password, props.history)} />
          )} />
          <PrivateRoute path="/dashboard/:guid" exact component={Dashboard} isAuthenticated={isAuthenticated} />
        </Router>
      </div>
    );
  }
}

export default App;
