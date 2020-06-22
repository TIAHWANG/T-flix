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
                    <Section title="Top Rated Shows">
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
                    </Section>
                )}
                {airingToday && airingToday.length > 0 && (
                    <Section title="Airing Today">
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
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular Shows">
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
                    </Section>
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
