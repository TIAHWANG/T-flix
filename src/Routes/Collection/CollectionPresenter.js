import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import Recommend from "Components/Recommend";

const Container = styled.div`
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

const BackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(6px);
    opacity: 0.6;
`;

const Cover = styled.div`
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

const Content = styled.div`
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    width: 80%;
    height: 100%;
    position: relative;
    z-index: 1;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 95%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 100%;
        font-size: 16px;
    }
`;

const Data = styled.div`
    min-width: 45%;
    width: 50%;
    margin: 10px 20px;
    position: relative;
    overflow: hidden;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        width: 60%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 100%;
        margin: 20px;
    }
`;

const MovieTitle = styled.h3`
    font-size: 30px;
    font-weight: 600;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        font-size: 25px;
    }
`;

const Overview = styled.p`
    opacity: 0.7;
    margin: 20px 0px;
    line-height: 1.5;
`;

const PosterContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 280px;
    grid-gap: 10px;
    height: 86%;
    padding-right: 10px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
`;

const CollectionPresenter = ({ collection, error, loading }) =>
    loading ? (
        <>
            <Helmet>
                <title>Loading | T-flix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{collection.name} | T-flix</title>
            </Helmet>
            <BackDrop bgImage={collection.backdrop_path ? `https://image.tmdb.org/t/p/original${collection.backdrop_path}` : null} />
            <Content>
                <Cover
                    bgImage={
                        collection.poster_path
                            ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
                            : require("../../Assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <MovieTitle>{collection.name}</MovieTitle>
                    <Overview>{collection.overview}</Overview>
                    {collection.parts && collection.parts.length > 0 && (
                        <PosterContainer>
                            {collection.parts.map((part) => (
                                <Recommend
                                    key={part.id}
                                    id={part.id}
                                    imageUrl={part.poster_path ? part.poster_path : require("../../Assets/noPosterSmall.png")}
                                    title={part.title}
                                    rating={part.vote_average}
                                    isMovie={true}
                                />
                            ))}
                        </PosterContainer>
                    )}
                </Data>
            </Content>
        </Container>
    );

CollectionPresenter.propTypes = {
    collection: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default CollectionPresenter;
