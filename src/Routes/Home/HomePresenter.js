import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Link } from "react-router-dom";

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

const Arrow = styled.svg`
    position: absolute;
    bottom: 16px;
    right: 15px;
    fill: ${(props) => props.theme.pinkColor};
`;

const MainDetail = styled.div`
    width: 165px;
    height: 50px;
    position: absolute;
    bottom: 33%;
    left: 7%;
    border-radius: 5px;
    background-color: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    color: ${(props) => props.theme.pinkColor};
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    &:hover {
        background-color: ${(props) => props.theme.pinkColor};
        border: 1px solid ${(props) => props.theme.pinkColor};
        color: ${(props) => props.theme.black};
        ${Arrow} {
            fill: ${(props) => props.theme.black};
        }
    }
`;

const MainButton = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
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
                    <Link to="/movie/3293">
                        <MainDetail>
                            <MainButton>Go To Detail</MainButton>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#141414">
                                <path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
                            </Arrow>
                        </MainDetail>
                    </Link>
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
