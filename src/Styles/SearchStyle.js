import styled from "styled-components";

export const Container = styled.div`
    padding: ${(props) => props.theme.padding};
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 20px;
    }
`;

export const PosterScroll = styled.div`
    width: 100%;
    display: flex;
    margin-right: 10px;
    overflow-x: auto;
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

export const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    all: unset;
    font-size: 25px;
    width: 100%;
    background-color: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.pinkColor};
    padding: 10px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        font-size: 18px;
    }
`;
