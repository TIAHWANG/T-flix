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
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        height: 35%;
        width: 50%;
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

const TVPresenter = ({ topRated, popular, airingToday, error, loading, isVisible }) => (
    <>
        <Helmet>
            <title>TV | T-flix</title>
        </Helmet>
        {loading ? (
            <Loader />
        ) : (
            <Container>
                <MainContainer>
                    <Link to="/tv/46952">
                        <MainPoster bgUrl="https://image.tmdb.org/t/p/original/8b4X7cFOagllHuERcefvDpECwDz.jpg" />
                        <MainLogo bgUrl={require("../../Assets/blackListLogo.png")} />
                    </Link>
                </MainContainer>
                {topRated && topRated.length > 0 && (
                    <>
                        <Section title="Top Rated Shows" name="top" isMovie={false} isVisible>
                            <PosterScroll>
                                {topRated.map((tv) => (
                                    <Poster
                                        key={tv.id}
                                        id={tv.id}
                                        rating={tv.vote_average}
                                        title={tv.name}
                                        imageUrl={tv.poster_path}
                                        year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                    />
                                ))}
                            </PosterScroll>
                        </Section>
                    </>
                )}
                {airingToday && airingToday.length > 0 && (
                    <>
                        <Section title="Airing Today" name="airing" isMovie={false} isVisible>
                            <PosterScroll>
                                {airingToday.map((tv) => (
                                    <Poster
                                        key={tv.id}
                                        id={tv.id}
                                        rating={tv.vote_average}
                                        title={tv.name}
                                        imageUrl={tv.poster_path}
                                        year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                    />
                                ))}
                            </PosterScroll>
                        </Section>
                    </>
                )}
                {popular && popular.length > 0 && (
                    <>
                        <Section title="Popular Shows" name="popular" isMovie={false} isVisible>
                            <PosterScroll>
                                {popular.map((tv) => (
                                    <Poster
                                        key={tv.id}
                                        id={tv.id}
                                        rating={tv.vote_average}
                                        title={tv.name}
                                        imageUrl={tv.poster_path}
                                        year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                    />
                                ))}
                            </PosterScroll>
                        </Section>
                    </>
                )}
                {error && <Message text={"Can't find TV Show Information."} color="#e74c3c" />}
            </Container>
        )}
    </>
);

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
