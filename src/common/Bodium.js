import React from 'react';
import styled from 'styled-components';
import theme from '../theme';

const BodiumView = ({ first, second, third }) => {
  return (
    <BodiumsWrapper>
      <Bodium user={second} icon="/medal2.png"/>
      <Bodium user={first} offset="90px" icon="/medal1.png"/>
      <Bodium user={third} icon="/medal3.png"/>
    </BodiumsWrapper>
  );
};

const Bodium = ({ user, offset }) => (
  <BodiumWrapper offset={offset}>
    <BodiumGraphicWrapper>
      <Banner>
        {user && user.firstName }
      </Banner>
      <Circle icon={user && user.icon}/>
    </BodiumGraphicWrapper>
    <ScoreWrapper>
      {user && user.points}
    </ScoreWrapper>
  </BodiumWrapper>
);

const BodiumsWrapper = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  
  ${theme.breakpoint.sm} {
    padding: 30px;
    margin-top: 100px;
  }
`;

const BodiumWrapper = styled.div`
  margin-bottom: ${props => props.offset};
  height: 200px;
`;

const BodiumGraphicWrapper = styled.div`
  width: 120px;
  height: 180px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  ${theme.breakpoint.sm} {
    width: 200px;
  }
`;


const Banner = styled.div`
  width: 150px;
  height: 35px;
  z-index: 2;
  background-image: url("/flag2.png");
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); 

  ${theme.breakpoint.md} {
    width: 200px;
    height: 40px;
  }
`;

const Medal = styled.div`
  width: 30px;
  height: 30px;
  z-index: 3;
  position: inherit;
  background-image: url("${props => props.src}");
  background-size: contain;
`;

const Circle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  border: 3px solid #ffaf79;
  background-color: #ffffff;
  background-image: url("${props => props.icon}");
  background-size: cover;
  float: left;
  z-index: 1;
  margin-top: -110px;
  
  ${theme.breakpoint.md} {
    width: 150px;
    height: 150px;
    border-radius: 75px;
    margin-top: -180px;
  }
`;

const ScoreWrapper = styled.div`
  margin-top: -50px;
  font-weight: bold;
  font-size: 1.1em;
  
  ${theme.breakpoint.sm} {
    font-size: 1.25em;
  }
`;

export default BodiumView;
