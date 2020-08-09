import styled from "styled-components";

export const Container = styled.div`
    padding: 0px ${(props) => props.theme.padding} ${(props) => props.theme.padding};
    width: 100%;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 0px 20px 20px;
    }
`;

export const MainContainer = styled.div`
    width: 100%;
    height: 80vh;
    padding-top: 20px;
    margin-bottom: 40px;
    position: relative;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        height: 30vh;
        margin-bottom: 20px;
    }
`;

export const MainPoster = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
`;

export const MainLogo = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    width: 65%;
    height: 30%;
    position: absolute;
    bottom: -10%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        height: 35%;
        width: 50%;
    }
`;

export const PosterScroll = styled.div`
    width: 100%;
    display: flex;
    margin-right: 10px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        height: 10px;
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
`;
