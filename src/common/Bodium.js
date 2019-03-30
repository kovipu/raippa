import React from 'react';
import styled from 'styled-components';

const BodiumView = (props) => {
  return (
    <BodiumWrapper>
      <Bodium>
        <Banner src="/flag2.png"></Banner>
        <Circle />
      </Bodium>
      <Bodium offset="90px">
        <Banner src="/flag2.png"></Banner>
        <Circle />
      </Bodium>
      <Bodium>
        <Banner src="/flag2.png"></Banner>
        <Circle />
      </Bodium>
    </BodiumWrapper>
  );
};

const BodiumWrapper = styled.div`
  padding: 30px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Bodium = styled.div`
  width: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.offset}
`;


const Banner = styled.img`
  width: 200px;
  height: 50px;
  z-index: 2
`;

const Circle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 2px solid #ffaf79;
  background-color: #ffffff;
  float: left;
  z-index; 1;
  margin-top: -144px;
`;

export default BodiumView;
