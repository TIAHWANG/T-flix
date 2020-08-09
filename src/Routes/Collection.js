import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";

import { moviesApi } from "../api";
import Loader from "../Components/Loader";
import Recommend from "../Components/Recommend";
import {
    Container,
    BackDrop,
    Cover,
    Content,
    Data,
    MovieTitle,
    Overview,
    PosterContainer,
} from "../Styles/CollectionStyle";

const Collection = () => {
    const { id } = useParams();
    const { push } = useHistory();

    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState([]);

    const getCollectionData = async () => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        try {
            const { data: collection } = await moviesApi.movieCollection(parsedId);
            setCollection(collection);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCollectionData();
    }, []);

    return loading ? (
        <>
            <Helmet>
                <title>Loading | T-flix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{collection.name} | T-flix</title>
            </Helmet>
            <BackDrop
                bgImage={
                    collection.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${collection.backdrop_path}`
                        : null
                }
            />
            <Content>
                <Cover
                    bgImage={
                        collection.poster_path
                            ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
                            : require("../Assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <MovieTitle>{collection.name}</MovieTitle>
                    <Overview>{collection.overview}</Overview>
                    {collection.parts && collection.parts.length > 0 && (
                        <PosterContainer>
                            {collection.parts.map((part) => (
                                <Recommend
                                    key={part.id}
                                    id={part.id}
                                    imageUrl={
                                        part.poster_path
                                            ? part.poster_path
                                            : require("../Assets/noPosterSmall.png")
                                    }
                                    title={part.title}
                                    rating={part.vote_average}
                                    isMovie={true}
                                />
                            ))}
                        </PosterContainer>
                    )}
                </Data>
            </Content>
        </Container>
    );
};

Collection.propTypes = {
    collection: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
};

export default Collection;
