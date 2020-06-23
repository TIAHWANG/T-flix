import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
    color: white;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const SearchPresenter = ({ movieResults, tvResults, searchTerm, error, loading, handleSubmit, updateTerm }) => (
    <>
        <Helmet>
            <title>Search | T-flix</title>
        </Helmet>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="Search Movies or TV Shows..." value={searchTerm} onChange={updateTerm} />
            </Form>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {movieResults && movieResults.length > 0 && (
                        <Section title="Movie Results">
                            {movieResults.map((movie) => (
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
                        </Section>
                    )}
                    {tvResults && tvResults.length > 0 && (
                        <Section title="TV Show Results">
                            {tvResults.map((tv) => (
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
                </>
            )}
            {error && <Message text={error} color="#e74c3c" />}
            {tvResults && movieResults && tvResults.length === 0 && movieResults.length === 0 && <Message text={"Nothing Found."} color="#95a5a6" />}
        </Container>
    </>
);

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchTerm: PropTypes.string,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
