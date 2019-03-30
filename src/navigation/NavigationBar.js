import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const NavigationBar = ({ userIcon }) => (
  <Navigation>
    <Logo src="/r-market2.png"/>
    <Icon src={userIcon} />
  </Navigation>
);

const Navigation = styled.div`
  width: 100vw;
  height: 90px;
  background: linear-gradient(-135deg, ${theme.color.gradientStart}, ${theme.color.gradientEnd});
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.img`
  height: 50px;
`;

const Icon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export default NavigationBar;
