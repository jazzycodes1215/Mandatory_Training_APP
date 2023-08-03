import React from 'react';
import styled from 'styled-components';
import mylogo from '../Icons/16px/logo512.png';

const LoadingScreen = () => {
  return (
    <Overlay>
      <LogoContainer>
        <Logo src={mylogo} alt="React Logo" />
        <Text>UTMTool</Text>
      </LogoContainer>
    </Overlay>
  );
};

// Styled components to style the LoadingScreen
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: auto
  height: auto
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Logo = styled.img`
  width: auto;
  height: auto;
  animation: spin .5s linear infinite;
`;

const Text = styled.p`
  color: white;
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export default LoadingScreen;
