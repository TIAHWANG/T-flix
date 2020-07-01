import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router-dom";
import Poster from "Components/Poster";
import Loader from "Components/Loader";

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
    width: 100%;
    display: ${(props) => (props.current ? "block" : "none")};
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
`;

const PosterContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const ArrowContainer = styled.div`
    position: relative;
    cursor: pointer;
`;

const Arrow = styled.svg`
    fill: ${(props) => props.theme.pinkColor};
    position: fixed;
    bottom: 20px;
    left: 50%;
    z-index: 9999;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.2);
    }
`;

const ListPresenter = withRouter(
    ({
        location: { pathname },
        nowPlayingList,
        upcomingList,
        popularMovieList,
        topRatedList,
        airingList,
        popularTvList,
        hasMore,
        isVisible,
        fetchMovieData,
        fetchTvData,
        scrollToTop,
    }) =>
        pathname.includes("movie") ? (
            <>
                <Container current={pathname.includes("now")}>
                    {isVisible && (
                        <ArrowContainer onClick={() => scrollToTop()}>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                            </Arrow>
                        </ArrowContainer>
                    )}
                    {nowPlayingList && (
                        <>
                            <InfiniteScroll dataLength={nowPlayingList.length} next={fetchMovieData} hasMore={hasMore} loader={<Loader />}>
                                <Title>Now Playing</Title>
                                <PosterContainer>
                                    {nowPlayingList.length > 0 &&
                                        nowPlayingList.map((movie) => (
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
                                </PosterContainer>
                            </InfiniteScroll>
                        </>
                    )}
                </Container>
                <Container current={pathname.includes("upcoming")}>
                    {isVisible && (
                        <ArrowContainer onClick={() => scrollToTop()}>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                            </Arrow>
                        </ArrowContainer>
                    )}
                    {upcomingList && (
                        <InfiniteScroll dataLength={upcomingList.length} next={fetchMovieData} hasMore={hasMore} loader={<Loader />}>
                            <Title>Upcoming Movies</Title>
                            <PosterContainer>
                                {upcomingList.length > 0 &&
                                    upcomingList.map((movie) => (
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
                            </PosterContainer>
                        </InfiniteScroll>
                    )}
                </Container>
                <Container current={pathname.includes("popular")}>
                    {isVisible && (
                        <ArrowContainer onClick={() => scrollToTop()}>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                            </Arrow>
                        </ArrowContainer>
                    )}
                    {popularMovieList && (
                        <InfiniteScroll dataLength={popularMovieList.length} next={fetchMovieData} hasMore={hasMore} loader={<Loader />}>
                            <Title>Popular Movies</Title>
                            <PosterContainer>
                                {popularMovieList.length > 0 &&
                                    popularMovieList.map((movie) => (
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
                            </PosterContainer>
                        </InfiniteScroll>
                    )}
                </Container>
            </>
        ) : (
            <>
                <Container current={pathname.includes("top")}>
                    {isVisible && (
                        <ArrowContainer onClick={() => scrollToTop()}>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                            </Arrow>
                        </ArrowContainer>
                    )}
                    {topRatedList && (
                        <InfiniteScroll dataLength={topRatedList.length} next={fetchTvData} hasMore={hasMore} loader={<Loader />}>
                            <Title>Top Rated Shows</Title>
                            <PosterContainer>
                                {topRatedList.length > 0 &&
                                    topRatedList.map((tv) => (
                                        <Poster
                                            key={tv.id}
                                            id={tv.id}
                                            rating={tv.vote_average}
                                            title={tv.name}
                                            imageUrl={tv.poster_path}
                                            year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                            isMovie={false}
                                        />
                                    ))}
                            </PosterContainer>
                        </InfiniteScroll>
                    )}
                </Container>
                <Container current={pathname.includes("airing")}>
                    {isVisible && (
                        <ArrowContainer onClick={() => scrollToTop()}>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                            </Arrow>
                        </ArrowContainer>
                    )}
                    {airingList && (
                        <InfiniteScroll dataLength={airingList.length} next={fetchTvData} hasMore={hasMore} loader={<Loader />}>
                            <Title>Airing Today</Title>
                            <PosterContainer>
                                {airingList.length > 0 &&
                                    airingList.map((tv) => (
                                        <Poster
                                            key={tv.id}
                                            id={tv.id}
                                            rating={tv.vote_average}
                                            title={tv.name}
                                            imageUrl={tv.poster_path}
                                            year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                            isMovie={false}
                                        />
                                    ))}
                            </PosterContainer>
                        </InfiniteScroll>
                    )}
                </Container>
                <Container current={pathname.includes("popular")}>
                    {isVisible && (
                        <ArrowContainer onClick={() => scrollToTop()}>
                            <Arrow xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.58l5.995 5.988-1.416 1.414-4.579-4.574-4.59 4.574-1.416-1.414 6.006-5.988z" />
                            </Arrow>
                        </ArrowContainer>
                    )}
                    {popularTvList && (
                        <InfiniteScroll dataLength={popularTvList.length} next={fetchTvData} hasMore={hasMore} loader={<Loader />}>
                            <Title>Popular Shows</Title>
                            <PosterContainer>
                                {popularTvList.length > 0 &&
                                    popularTvList.map((tv) => (
                                        <Poster
                                            key={tv.id}
                                            id={tv.id}
                                            rating={tv.vote_average}
                                            title={tv.name}
                                            imageUrl={tv.poster_path}
                                            year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                                            isMovie={false}
                                        />
                                    ))}
                            </PosterContainer>
                        </InfiniteScroll>
                    )}
                </Container>
            </>
        )
);

ListPresenter.propTypes = {
    nowPlayingList: PropTypes.array,
    upcomingList: PropTypes.array,
    popularMovieList: PropTypes.array,
    topRatedList: PropTypes.array,
    airingList: PropTypes.array,
    popularTvList: PropTypes.array,
    hasMore: PropTypes.bool,
    isVisible: PropTypes.bool,
    fetchMovieData: PropTypes.func,
    fetchTvData: PropTypes.func,
    scrollToTop: PropTypes.func,
};

export default ListPresenter;
