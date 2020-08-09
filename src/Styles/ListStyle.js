import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    padding: 20px ${(props) => props.theme.padding} ${(props) => props.theme.padding};
    width: 100%;
    display: ${(props) => (props.current ? "block" : "none")};
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 20px;
    }
`;

export const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        font-size: 20px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        font-size: 18px;
        padding: 0px 5px;
    }
`;

export const PosterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        display: grid;
        grid-template-columns: repeat(auto-fill, 25%);
        grid-auto-rows: 200px;
    }
`;

export const fadeIn = keyframes`
   0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
   0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ArrowContainer = styled.div`
    position: relative;
    cursor: pointer;
    visibility: ${(props) => (props.out ? "visible" : "hidden")};
    animation: ${(props) => (props.out ? fadeIn : fadeOut)} 1.5s ease-in-out;
    transition: visibility 1.5s ease-in-out;
    z-index: 9999;
`;

export const Arrow = styled.svg`
    fill: ${(props) => props.theme.pinkColor};
    position: fixed;
    bottom: 20px;
    left: 50%;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        position: fixed;
        left: 45.5%;
    }
`;
