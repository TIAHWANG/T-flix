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
    width: 800px;
    height: 250px;
    position: absolute;
    bottom: -5px;
    left: 0;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 600px;
        height: 200px;
        position: absolute;
        bottom: -15px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 250px;
        height: 100px;
        position: absolute;
        bottom: -25px;
    }
`;

const MainDetail = styled.div`
    width: 165px;
    height: 50px;
    position: absolute;
    bottom: 32%;
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
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 135px;
        height: 35px;
        position: absolute;
        bottom: 24%;
        left: 13px;
        font-size: 16px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 100px;
        height: 30px;
        position: absolute;
        bottom: 27%;
        left: 5px;
        font-size: 12px;
    }
`;

const MainButton = styled.div`
    display: flex;
    align-items: center;
    padding-left: 15px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        padding-left: 12px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding-left: 7px;
    }
`;

const Arrow = styled.svg`
    position: absolute;
    bottom: 16px;
    right: 15px;
    fill: ${(props) => props.theme.pinkColor};
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        position: absolute;
        bottom: 10px;
        right: 9px;
        width: 12px;
        height: 12px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        position: absolute;
        bottom: 9px;
        right: 5px;
        width: 10px;
        height: 10px;
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
                    <MainPoster bgUrl="https://image.tmdb.org/t/p/original/8b4X7cFOagllHuERcefvDpECwDz.jpg" />
                    <MainLogo bgUrl={require("../../Assets/blackListLogo.png")} />
                    <Link to="/tv/46952">
                        <MainDetail>
                            <MainButton>Go To Detail</MainButton>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="#141414">
                                <path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
                            </Arrow>
                        </MainDetail>
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
