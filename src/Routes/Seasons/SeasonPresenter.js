import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import Episode from "Components/Episode";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

const Content = styled.div`
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    width: 80%;
    height: 100%;
    z-index: 1;
`;

const Data = styled.div`
    min-width: 45%;
    width: 50%;
    margin: 10px 20px;
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const EpisodeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 95%;
    padding-right: 10px;
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
`;

const NoContentMessage = styled.div`
    opacity: 0.9;
`;

const SeasonPresenter = ({ season, showName, error, loading }) =>
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
                <title>{showName} | T-flix</title>
            </Helmet>
            <BackDrop bgImage={season.poster_path ? `https://image.tmdb.org/t/p/original${season.poster_path}` : null} />
            <Content>
                <Cover
                    bgImage={
                        season.poster_path ? `https://image.tmdb.org/t/p/original${season.poster_path}` : require("../../Assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <Title>
                        {showName} - {season.name}
                    </Title>
                    <EpisodeContainer>
                        {season.episodes &&
                            season.episodes.length > 0 &&
                            season.episodes.map((episode) => (
                                <Episode
                                    key={episode.id}
                                    id={episode.episode_number}
                                    title={episode.name}
                                    imageUrl={episode.still_path}
                                    overview={
                                        episode.overview ? (
                                            episode.overview
                                        ) : (
                                            <NoContentMessage>
                                                No Information{" "}
                                                <span role="img" aria-label="no videos">
                                                    😢
                                                </span>
                                            </NoContentMessage>
                                        )
                                    }
                                    date={episode.air_date}
                                />
                            ))}
                    </EpisodeContainer>
                </Data>
            </Content>
        </Container>
    );

SeasonPresenter.propTypes = {
    season: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default SeasonPresenter;
