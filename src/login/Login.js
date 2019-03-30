import React, { Component } from 'react';
import styled from 'styled-components';

import theme from '../theme';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleKeyPress = ev => {
    if (ev.key === 'Enter') {
      const { email, password } = this.state;
      this.props.onLogin(email, password);
    }
  };

  render() {
    return (
      <LoginViewWrapper>
        <LoginBoxWrapper>
          <Logo src="/r-market.png" />

          <LoginFormWrapper>
            <h1>Raippa</h1>
            <strong>{this.props.error}</strong>
            <Input type="text"
                   name="email"
                   placeholder="Sähköpostiosoite"
                   onChange={ev => this.setState({ email: ev.target.value })}
                   onKeyPress={this.handleKeyPress} />
            <Input type="password"
                   name="password"
                   placeholder="Salasana"
                   onChange={ev => this.setState({ password: ev.target.value })}
                   onKeyPress={this.handleKeyPress} />
             <LoginButton onClick={() => this.props.onLogin(this.state.email, this.state.password)}>
               KIRJAUDU
             </LoginButton>
          </LoginFormWrapper>
        </LoginBoxWrapper>
      </LoginViewWrapper>
    );
  }
}

const LoginViewWrapper = styled.div`
  background: linear-gradient(-135deg, ${theme.color.gradientStart}, ${theme.color.gradientEnd});
  width: 100vw;
  height: 100vh;
  padding-top: 1vh;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${theme.breakpoint.sm} {
    padding-top: 0;
  }
`;

const LoginBoxWrapper = styled.div`
  padding: 30px;
  min-height: 99vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  background-color: white;

  ${theme.breakpoint.sm} {
    border-radius: 25px;
    flex-direction: row;
    min-width: 750px;
    max-width: 900px;
    min-height: 60vh;
  }

`;

const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 300px;

  ${theme.breakpoint.sm} {
    margin: 30px;
    width: 300px;
  }
`;

const Logo = styled.img`
  width: 250px;
  height: 250px;

  ${theme.breakpoint.sm} {
    margin: 30px;
  }
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 0 30px 0 30px;
  margin-top: 10px;
  border-radius: 25px;
  background-color: ${theme.color.lightGray};
  border: none;
  outline: none;
  font-size: 1.1rem;
`;

const LoginButton = styled.button`
  height: 50px;
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: ${theme.color.gradientEnd};
  border-radius: 25px;
  border: none;
  outline: none;
  margin-top: 30px;
  color: white;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${theme.color.gray}
  }
`;

export default Login;
