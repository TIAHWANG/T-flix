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
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 20px;
    }
`;

const PosterScroll = styled.div`
    width: 100%;
    display: flex;
    margin-right: 10px;
    overflow-x: auto;
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

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    all: unset;
    font-size: 25px;
    width: 100%;
    background-color: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.pinkColor};
    padding: 10px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        font-size: 18px;
    }
`;

const SearchPresenter = ({ movieResults, tvResults, searchTerm, error, loading, handleSubmit, updateTerm, isVisible }) => (
    <>
        <Helmet>
            <title>Search | T-flix</title>
        </Helmet>
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="Search Movies or TV Shows" value={searchTerm} onChange={updateTerm} />
            </Form>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Helmet>
                        <title>{searchTerm} | T-flix</title>
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
                                            year={movie.release_date && movie.release_date.substring(0, 4)}
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
                                            year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                        />
                                    ))}
                                </PosterScroll>
                            </Section>
                        </>
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
