import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './router';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import './App.css';

class App extends Component {
  state = {
    userEmail: ''
  };

  handleLogin = (userEmail, history) => {
    window.sessionStorage.setItem('login', userEmail);
    this.setState({ userEmail });
    history.push('/');
  };

  render() {
    const isAuthenticated = window.sessionStorage.getItem('login') != null;
    console.log('Is authenticated', isAuthenticated);
    return (
      <div className="App">
        <Router>
          <Route path="/login" render={props => (
            <Login onLogin={email => this.handleLogin(email, props.history)} />
          )} />
          <PrivateRoute path="/" exact component={Dashboard} isAuthenticated={isAuthenticated} />
        </Router>
      </div>
    );
  }
}

export default App;
