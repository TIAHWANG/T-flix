import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

// http://localhost:3000/movie/3293

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
    width: 100%;
`;

const MainContainer = styled.div`
    width: 100%;
    height: 80vh;
    margin-bottom: 20px;
    position: relative;
`;

const MainPoster = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
`;

const MainDetail = styled.div`
    width: 100px;
    height: 30px;
    border: 5px solid red;
    position: absolute;
    bottom: 35%;
    left: 7%;
`;

const PosterScroll = styled.div`
    width: 100%;
    display: flex;
    margin-right: 10px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
`;

const HomePresenter = ({ nowPlaying, upcoming, popular, error, loading }) => (
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
                    <MainPoster bgUrl="https://image.tmdb.org/t/p/original/qDxF78TrfpWh5s1dFsu0mzgMKHZ.jpg" />
                    <MainDetail>Go to Detail</MainDetail>
                </MainContainer>
                {nowPlaying && nowPlaying.length > 0 && (
                    <>
                        <Section title="Now Playing">
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
                        <Section title="Upcoming Movies">
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
                        <Section title="Popular Movies">
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
