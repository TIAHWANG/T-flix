import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import uniqBy from "lodash.uniqby";
import { Helmet } from "react-helmet";

import { tvApi } from "../../api";
import { useInfiniteScroll } from "../../Hooks/useInfiniteScroll";
import Loader from "../../Components/Loader";
import ListPoster from "../../Components/ListPoster";
import { Container, ArrowContainer, Arrow, Title, PosterContainer } from "../../Styles/ListStyle";

const PopularTVList = () => {
    const { pathname } = useLocation();

    const [loading, setLoading] = useState(true);
    const [TVList, setTVList] = useState([]);
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
                data: { results: TVList },
            } = await tvApi.popular(page);
            setTVList(TVList);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchMore = async () => {
        try {
            const {
                data: { results: newTVList },
            } = await tvApi.popular(page);
            const newList = [...TVList, ...newTVList];
            setTVList(uniqBy(newList, "id"));
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
                <title>Popular Shows | T-flix</title>
            </Helmet>
            <Container current={pathname.includes("popular")}>
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
                {TVList && (
                    <>
                        <Title>Popular Shows</Title>
                        <PosterContainer>
                            {TVList.length > 0 &&
                                TVList.map((tv) => (
                                    <ListPoster
                                        key={tv.id}
                                        id={tv.id}
                                        rating={tv.vote_average}
                                        title={tv.name}
                                        imageUrl={tv.poster_path}
                                        year={
                                            tv.first_air_date && tv.first_air_date.substring(0, 4)
                                        }
                                        isMovie={false}
                                    />
                                ))}
                        </PosterContainer>
                    </>
                )}
            </Container>
        </>
    );
};

PopularTVList.propTypes = {
    TVList: PropTypes.array,
    getMovieData: PropTypes.func,
    scrollToTop: PropTypes.func,
    isVisible: PropTypes.bool,
};

export default PopularTVList;
