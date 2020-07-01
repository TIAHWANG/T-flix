import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Poster from "Components/Poster";
import Loader from "Components/Loader";
import { withRouter } from "react-router-dom";

const Container = styled.div`
    padding: ${(props) => props.theme.padding};
    width: 100%;
    height: 100vh;
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
        fetchMovieData,
        fetchTvData,
    }) =>
        pathname.includes("movie") ? (
            <>
                <Container current={pathname.includes("now")}>
                    {nowPlayingList && (
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
                    )}
                </Container>
                <Container current={pathname.includes("upcoming")}>
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
    fetchMovieData: PropTypes.func,
    fetchTvData: PropTypes.func,
};

export default ListPresenter;
