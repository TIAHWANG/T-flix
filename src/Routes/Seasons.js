import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useParams, useHistory, useLocation } from "react-router-dom";

import { tvApi } from "../api";
import Loader from "../Components/Loader";
import Episode from "../Components/Episode";

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
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        width: 60%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 100%;
        margin: 20px;
    }
`;

const Title = styled.div`
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 10px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        font-size: 25px;
    }
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

const Seasons = () => {
    const { id } = useParams();
    const { push } = useHistory();
    const { pathname } = useLocation();

    const [loading, setLoading] = useState(true);
    const [season, setSeason] = useState([]);
    const [showName, setShowName] = useState(null);

    const getSeasonData = async () => {
        const showName = pathname.split("/")[5];
        const tvId = pathname.split("/")[2];
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        try {
            const { data: season } = await tvApi.seasons(tvId, parsedId);
            setSeason(season);
            setShowName(showName);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSeasonData();
    }, []);

    return loading ? (
        <>
            <Helmet>
                <title>Loading | T-flix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{`${showName}`} | T-flix</title>
            </Helmet>
            <BackDrop
                bgImage={
                    season.poster_path
                        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                        : null
                }
            />
            <Content>
                <Cover
                    bgImage={
                        season.poster_path
                            ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                            : require("../Assets/noPosterSmall.png")
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
};

Seasons.propTypes = {
    season: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            overview: PropTypes.string,
            poster_path: PropTypes.string,
            episodes: PropTypes.objectOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    air_date: PropTypes.string,
                    name: PropTypes.string,
                    overview: PropTypes.string,
                    episode_number: PropTypes.number.isRequired,
                    still_path: PropTypes.string,
                }).isRequired
            ).isRequired,
        }).isRequired
    ),
    error: PropTypes.string,
    loading: PropTypes.bool,
};

export default Seasons;
