import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './router';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import './App.css';

class App extends Component {
  state = {
    user: null,
    error: null
  };

  componentDidMount() {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    this.setState({ user });
  }

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
      this.setState({ error: 'Virheellinen sähköposti tai salasana!' });
      return console.log('Error!')
    }

    const user = await response.json();
    this.setState({ error: null });

    window.sessionStorage.setItem('user', JSON.stringify(user));
    this.setState({ user });
    history.push(`/dashboard/${user.store}`);
  };

  render() {
    const isAuthenticated = !!this.state.user;
    return (
      <div className="App">
        <Router>
          <Route path="/" exact render={props => (
            isAuthenticated
              ? <Redirect to={`/dashboard/${this.state.user.store}`} />
              : <Login onLogin={(email, password) => this.handleLogin(email, password, props.history)}
                       error={this.state.error}/>
          )} />
          <PrivateRoute path="/dashboard/:guid" exact component={props => (
            <Dashboard {...props} user={this.state.user} />
          )} isAuthenticated={isAuthenticated} />
        </Router>
      </div>
    );
  }
}

export default App;
