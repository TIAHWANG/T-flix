import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const SLoader = styled.div`
    width: 80px;
    height: 80px;
    border: 10px solid #f9d7d6;
    border-radius: 50%;
    border-top: 10px solid #141414;
    animation: ${Spin} 0.8s linear infinite;
`;

export default () => (
    <Container>
        <SLoader />
    </Container>
);
