import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {topRated && topRated.length > 0 && (
                <Section title="Top Rated Shows">
                    {topRated.map((tv) => (
                        <span key={tv.id}>{tv.name}</span>
                    ))}
                </Section>
            )}
            {airingToday && airingToday.length > 0 && (
                <Section title="Airing Today">
                    {airingToday.map((tv) => (
                        <span key={tv.id}>{tv.name}</span>
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Shows">
                    {popular.map((tv) => (
                        <span key={tv.id}>{tv.name}</span>
                    ))}
                </Section>
            )}
            {error && <Message text={"Can't find TV Show Information."} color="#e74c3c" />}
        </Container>
    );

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default TVPresenter;
