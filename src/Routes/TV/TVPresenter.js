import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
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
