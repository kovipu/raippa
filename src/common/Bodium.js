import React from 'react';
import styled from 'styled-components';

const BodiumView = ({ first, second, third }) => {
  return (
    <BodiumsWrapper>
      <Bodium user={second} icon="/medal2.png"/>
      <Bodium user={first} offset="90px" icon="/medal1.png"/>
      <Bodium user={third} icon="/medal3.png"/>
    </BodiumsWrapper>
  );
};

const Bodium = ({ user, offset, icon }) => (
  <BodiumWrapper offset={offset}>
    <Medal src={icon} />
    <Banner>
      {user && user.firstName }
    </Banner>
    {user && user.points}
    <Circle icon={user && user.icon}/>
  </BodiumWrapper>
)

const BodiumsWrapper = styled.div`
  padding: 30px;
  text-align: center;
  width: 100%;
  height: 180px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const BodiumWrapper = styled.div`
  width: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.offset}
`;


const Banner = styled.div`
  width: 200px;
  height: 40px;
  z-index: 2;
  background-image: url("/flag2.png");
  background-position: center bottom;
  background-size: contain;
  background-repeat: no-repeat;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1); 

`;

const Medal = styled.img`
  width: 30px;
  height: 30px;
  z-index: 3;
  position: inherit;

`;

const Circle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 3px solid #ffaf79;
  background-color: #ffffff;
  background-image: url("${props => props.icon}");
  background-size: cover;
  float: left;
  z-index; 1;
  margin-top: -144px;
`;

export default BodiumView;
