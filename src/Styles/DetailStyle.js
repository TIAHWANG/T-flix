import styled from "styled-components";

export const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 0px;
    }
`;

export const BackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(4px);
    opacity: 0.7;
`;

export const Content = styled.div`
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    width: 80%;
    height: 100%;
    position: relative;
    z-index: 1;
    font-size: 18px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 95%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 100%;
        font-size: 16px;
    }
`;

export const Cover = styled.div`
    width: 50%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        width: 40%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        display: none;
    }
`;

export const Data = styled.div`
    min-width: 45%;
    width: 50%;
    margin: 10px 20px 0px;
    position: relative;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        width: 60%;
        margin: 20px 20px 0px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 100%;
    }
`;

export const MovieTitle = styled.h3`
    font-size: 30px;
    font-weight: 600;
`;

export const ItemContainer = styled.div`
    margin: 20px 0;
    display: flex;
`;

export const Item = styled.span`
    padding: 2px 0px;
`;

export const Imdb = styled.a`
    vertical-align: text-bottom;
`;

export const Divider = styled.div`
    margin: 0 10px;
`;

export const Description = styled.div`
    line-height: 1.5;
    width: 100%;
    height: 82%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    padding-right: 10px;
`;

export const TabContainer = styled.div`
    width: 100%;
`;

export const Overview = styled.p`
    opacity: 0.7;
    line-height: 1.5;
    margin-bottom: 20px;
`;

export const ItemTitle = styled.div`
    font-weight: 600;
    &:not(:first-child) {
        margin-top: 20px;
    }
    margin-bottom: 5px;
    opacity: 0.9;
`;

export const Genre = styled.div`
    font-size: 16px;
    opacity: 0.9;
`;

export const CastScroll = styled.div`
    display: flex;
    margin-right: 10px;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
`;

export const CreatorContainer = styled.div`
    width: 100%;
    margin-right: 10px;
    display: flex;
`;

export const CollectionContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

export const SeasonContainer = styled.div`
    width: 100%;
    display: flex;
`;

export const SeasonScroll = styled.div`
    display: flex;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
    margin-bottom: 10px;
`;

export const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-right: 10px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        grid-auto-rows: 300px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        grid-template-columns: repeat(1, 1fr);
        &:last-child {
            margin-bottom: 10px;
        }
    }
`;

export const NoContentMessage = styled.div`
    font-size: 16px;
    opacity: 0.9;
`;

export const RecommendContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    margin-right: 10px;
`;

export const CompanyContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

export const CompanyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
    text-align: center;
    border-bottom: 1px solid ${(props) => props.theme.pinkColor};
    border-top: 1px solid ${(props) => props.theme.pinkColor};
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        grid-template-columns: repeat(3, 1fr);
    }
`;
