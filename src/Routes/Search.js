import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

import { moviesApi, tvApi } from "../api";
import Loader from "../Components/Loader";
import Section from "../Components/Section";
import Message from "../Components/Message";
import Poster from "../Components/Poster";

import { Container, PosterScroll, Form, Input } from "../Styles/SearchStyle";

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [movieResults, setMovieResults] = useState([]);
    const [tvResults, setTvResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm("");
        searchByTerm();
    };

    const updateTerm = (e) => {
        const {
            target: { value },
        } = e;
        setSearchTerm(value);
    };

    const searchByTerm = async () => {
        setLoading(true);
        try {
            const {
                data: { results: movieResults },
            } = await moviesApi.searchMovie(searchTerm);
            const {
                data: { results: tvResults },
            } = await tvApi.searchTv(searchTerm);
            setMovieResults(movieResults);
            setTvResults(tvResults);
            if (movieResults.length === 0 || tvResults.length === 0)
                setError(`Can't find results for "${searchTerm}"`);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Search | T-flix</title>
            </Helmet>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Input
                        placeholder="Search Movies or TV Shows"
                        value={searchTerm}
                        onChange={updateTerm}
                    />
                </Form>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Helmet>
                            <title>{`${searchTerm}`} | T-flix</title>
                        </Helmet>
                        {movieResults && movieResults.length > 0 && (
                            <>
                                <Section title="Movie Results" isVisible={false}>
                                    <PosterScroll>
                                        {movieResults.map((movie) => (
                                            <Poster
                                                key={movie.id}
                                                id={movie.id}
                                                rating={movie.vote_average}
                                                title={movie.title}
                                                imageUrl={movie.poster_path}
                                                year={
                                                    movie.release_date &&
                                                    movie.release_date.substring(0, 4)
                                                }
                                                isMovie={true}
                                            />
                                        ))}
                                    </PosterScroll>
                                </Section>
                            </>
                        )}
                        {tvResults && tvResults.length > 0 && (
                            <>
                                <Section title="TV Show Results" isVisible={false}>
                                    <PosterScroll>
                                        {tvResults.map((tv) => (
                                            <Poster
                                                key={tv.id}
                                                id={tv.id}
                                                rating={tv.vote_average}
                                                title={tv.name}
                                                imageUrl={tv.poster_path}
                                                year={
                                                    tv.first_air_date &&
                                                    tv.first_air_date.substring(0, 4)
                                                }
                                            />
                                        ))}
                                    </PosterScroll>
                                </Section>
                            </>
                        )}
                    </>
                )}
                {error && <Message text={error} />}
            </Container>
        </>
    );
};

Search.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    searchTerm: PropTypes.string,
    loading: PropTypes.bool,
    handleSubmit: PropTypes.func,
    updateTerm: PropTypes.func,
};

export default Search;
