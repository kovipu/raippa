import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../theme';

class NavigationBar extends Component {
  state = {
    store: null
  };

  async componentDidMount() {
    const response = await fetch(`https://rmarket-backend.herokuapp.com/stores/${this.props.user.store}`);
    const store = await response.json();
    this.setState({ store });
  }

  render() {
    const { firstName, lastName, icon } = this.props.user;
    return (
      <Navigation>
        <Logo src="/r-market2.png"/>
        <UserWrapper>
          <TextWrapper>
            <Name>{firstName} {lastName}</Name>
            <Store>{this.state.store && this.state.store.name}</Store>
          </TextWrapper>
          <Icon src={icon}/>
        </UserWrapper>
      </Navigation>
    );
  }
}

const Navigation = styled.div`
  width: 100vw;
  height: 90px;
  background: linear-gradient(-135deg, ${theme.color.gradientStart}, ${theme.color.gradientEnd});
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.img`
  height: 30px;
  
  ${theme.breakpoint.sm} {
    height: 50px;
  }
`;

const UserWrapper = styled.div`
  height: 50px;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); 
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: none;
  
  ${theme.breakpoint.sm} {
    display: flex;
    flex-direction: column;
  }
`;

const Name = styled.div`
  font-size: 1em
`;

const Store = styled.div`
  font-size: 0.9em;
  text-align: center;
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin-left: 20px;
`;

export default NavigationBar;
