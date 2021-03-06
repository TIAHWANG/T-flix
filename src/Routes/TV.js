import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { tvApi } from "../api";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";
import { Container, MainContainer, MainPoster, MainLogo, PosterScroll } from "../Styles/TVStyle";

const TV = () => {
    const [loading, setLoading] = useState(true);
    const [topRated, setTopRated] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [popular, setPopular] = useState([]);
    const [error, setError] = useState(null);

    const getTvData = async () => {
        try {
            const {
                data: { results: topRated },
            } = await tvApi.topRated();
            const {
                data: { results: popular },
            } = await tvApi.popular();
            const {
                data: { results: airingToday },
            } = await tvApi.airingToday();
            setTopRated(topRated);
            setPopular(popular);
            setAiringToday(airingToday);
        } catch {
            setError("Can't find TV Show Information.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTvData();
    }, []);

    return (
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
                            <MainLogo bgUrl={require("../Assets/blackListLogo.png")} />
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
                    {error && <Message text={"Can't find TV Show Information."} color="#e74c3c" />}
                </Container>
            )}
        </>
    );
};

TV.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
};

export default TV;
