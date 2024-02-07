import { Loader } from 'monday-ui-react-core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { WeatherContext } from '../context/weatherContext';
    
function Loading() {
    const {isLoading} = useContext(WeatherContext) 
    
  return (
  <Container isloading={isLoading}>
    <LoaderContainer>
        <Loader size={100} color='#4D4494'>
        </Loader>
    </LoaderContainer>
  </Container>   
  );
}

export default Loading;

const LoaderContainer = styled.div`
    position: fixed;
    right: 50%;
    top: 50%;
    z-index: 3;

`;

const Container = styled.div`
display: ${(prop) => prop.isloading ? "inline": "none"};
position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.7);
`