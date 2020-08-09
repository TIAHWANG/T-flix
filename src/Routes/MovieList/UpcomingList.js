import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import uniqBy from "lodash.uniqby";
import { Helmet } from "react-helmet";

import { moviesApi } from "../../api";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import Loader from "../../Components/Loader";
import ListPoster from "../../Components/ListPoster";
import { Container, ArrowContainer, Arrow, Title, PosterContainer } from "../../Styles/ListStyle";

const UpcomingList = () => {
    const { pathname } = useLocation();

    const [loading, setLoading] = useState(true);
    const [movieList, setMovieList] = useState([]);
    const page = useInfiniteScroll();

    // 화면 위로 올리는 화살표 아이콘 설정
    const [isVisible, SetIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 400 && !isVisible) SetIsVisible(true);
        else if (window.pageYOffset === 0) SetIsVisible(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const fetchInitial = async () => {
        try {
            const {
                data: { results: movieList },
            } = await moviesApi.upcoming(page);
            setMovieList(movieList);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchMore = async () => {
        try {
            const {
                data: { results: newMovieList },
            } = await moviesApi.upcoming(page);
            const newList = [...movieList, ...newMovieList];
            setMovieList(uniqBy(newList, "id"));
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchInitial();
    }, []);

    useEffect(() => {
        fetchMore();
        window.addEventListener("scroll", handleScroll);
    }, [page]);

    return loading ? (
        <>
            <Helmet>
                <title>Loading | T-flix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <>
            <Helmet>
                <title>Upcoming Movies | T-flix</title>
            </Helmet>
            <Container current={pathname.includes("upcoming")}>
                <ArrowContainer onClick={() => scrollToTop()} out={isVisible}>
                    <Arrow
                        xmlns="http://www.w3.org/2000/svg"
                        width="45"
                        height="45"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                    </Arrow>
                </ArrowContainer>
                {movieList && (
                    <>
                        <Title>Upcoming Movies</Title>
                        <PosterContainer>
                            {movieList.length > 0 &&
                                movieList.map((movie) => (
                                    <ListPoster
                                        key={movie.id}
                                        id={movie.id}
                                        rating={movie.vote_average}
                                        title={movie.title}
                                        imageUrl={movie.poster_path}
                                        year={
                                            movie.release_date && movie.release_date.substring(0, 4)
                                        }
                                        isMovie={true}
                                    />
                                ))}
                        </PosterContainer>
                    </>
                )}
            </Container>
        </>
    );
};

UpcomingList.propTypes = {
    movieList: PropTypes.array,
    getMovieData: PropTypes.func,
    scrollToTop: PropTypes.func,
    isVisible: PropTypes.bool,
};

export default UpcomingList;
