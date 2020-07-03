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
`;

const MainContainer = styled.div`
    width: 100%;
    height: 80vh;
    padding-top: 20px;
    margin-bottom: 40px;
    position: relative;
`;

const MainPoster = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
`;

const MainLogo = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    width: 800px;
    height: 250px;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const MainDetail = styled.div`
    width: 165px;
    height: 50px;
    position: absolute;
    bottom: 21%;
    left: 15px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    color: ${(props) => props.theme.pinkColor};
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    transition: border-radius 0.3s ease-in-out, border 0.3s ease-in-out;
    &:hover {
        border-radius: 30px;
    }
`;

const MainButton = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
`;

const Arrow = styled.svg`
    position: absolute;
    bottom: 16px;
    right: 15px;
    fill: ${(props) => props.theme.pinkColor};
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
                    <MainPoster bgUrl="https://image.tmdb.org/t/p/original/jHNdwbUGd5gFQzxKGEXXhjhUVnC.jpg" />
                    <MainLogo bgUrl={require("../../Assets/gilmoreLogo.jpg")} />
                    <Link to="/movie/9614">
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
                        <Section title="Now Playing" name="now" isMovie isVisible>
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
                        <Section title="Upcoming Movies" name="upcoming" isMovie isVisible>
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
                        <Section title="Popular Movies" name="popular" isMovie isVisible>
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
