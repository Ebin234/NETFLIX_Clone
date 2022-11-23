import React from 'react';
import Background from '../../assets/front.jpg';
import styled from 'styled-components';

export default function BackgroundImage() {
  return (
    <Container>
      <img src={Background} alt="BackgroundImage" />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  img{
    height : 100vh;
    width: 100vw;
  }
`;
