import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";
import { Link } from "react-router-dom";

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
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

const MainLogo = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: contain;
    background-repeat: no-repeat;
    width: 800px;
    height: 250px;
    position: absolute;
    bottom: -5px;
    left: 0;
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
    bottom: 32%;
    left: 15px;
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

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => (
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
                        <Section title="Top Rated Shows">
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
                        <Section title="Airing Today">
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
                        <Section title="Popular Shows">
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
