import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import './App.css';

class App extends Component {
  state = {
    userEmail: ''
  };

    handleLogin = (userEmail) => { 
        window.sessionStorage.setItem('login', userEmail); 
        this.setState({ userEmail });
    }

  render() {
    return (
      <div className="App">
        {window.sessionStorage.getItem('login') == null
          ? <Login onLogin={this.handleLogin} />
          : <Dashboard />
        }
      </div>
    );
  }
}

export default App;
