import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: 0px ${(props) => props.theme.padding} ${(props) => props.theme.padding};
    width: 100%;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 0px 20px 20px;
    }
`;

const MainContainer = styled.div`
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

const MainPoster = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
`;

const MainLogo = styled.div`
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
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        background-size: cover;
    }
`;

const PosterScroll = styled.div`
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

const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading, isVisible }) => (
    <>
        <Helmet>
            <title>Movies | T-flix</title>
        </Helmet>
        {loading ? (
            <Loader />
        ) : (
            <Container>
                <Helmet>
                    <title>Movies | T-flix</title>
                </Helmet>
                <MainContainer>
                    <Link to="/movie/9614">
                        <MainPoster bgUrl="https://image.tmdb.org/t/p/original/jHNdwbUGd5gFQzxKGEXXhjhUVnC.jpg" />
                        <MainLogo bgUrl={require("../../Assets/gilmoreLogo.jpg")} />
                    </Link>
                </MainContainer>
                {nowPlaying && nowPlaying.length > 0 && (
                    <>
                        <Section title="Now Playing" name="now" isMovie>
                            <PosterScroll>
                                {nowPlaying.map((movie) => (
                                    <Poster
                                        key={movie.id}
                                        id={movie.id}
                                        rating={movie.vote_average}
                                        title={movie.title}
                                        imageUrl={movie.poster_path}
                                        year={movie.release_date && movie.release_date.substring(0, 4)}
                                        isMovie={true}
                                    />
                                ))}
                            </PosterScroll>
                        </Section>
                    </>
                )}
                {upcoming && upcoming.length > 0 && (
                    <>
                        <Section title="Upcoming Movies" name="upcoming" isMovie>
                            <PosterScroll>
                                {upcoming.map((movie) => (
                                    <Poster
                                        key={movie.id}
                                        id={movie.id}
                                        rating={movie.vote_average}
                                        title={movie.title}
                                        imageUrl={movie.poster_path}
                                        year={movie.release_date && movie.release_date.substring(0, 4)}
                                        isMovie={true}
                                    />
                                ))}
                            </PosterScroll>
                        </Section>
                    </>
                )}
                {popular && popular.length > 0 && (
                    <>
                        <Section title="Popular Movies" name="popular" isMovie>
                            <PosterScroll>
                                {popular.map((movie) => (
                                    <Poster
                                        key={movie.id}
                                        id={movie.id}
                                        rating={movie.vote_average}
                                        title={movie.title}
                                        imageUrl={movie.poster_path}
                                        year={movie.release_date && movie.release_date.substring(0, 4)}
                                        isMovie={true}
                                    />
                                ))}
                            </PosterScroll>
                        </Section>
                    </>
                )}
                {error && <Message text={"Can't find Movie Information."} color="#e74c3c" />}
            </Container>
        )}
    </>
);

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upcoming: PropTypes.array,
    popular: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default HomePresenter;
