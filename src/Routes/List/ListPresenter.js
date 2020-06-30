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

const ListPresenter = withRouter(({ location: { pathname }, nowPlayingList, upcomingList, popularMovieList, hasMore, fetchMovieData }) => (
    <>
        <Container current={pathname.includes("now")}>
            {nowPlayingList && (
                <InfiniteScroll
                    dataLength={nowPlayingList.length} //This is important field to render the next data
                    next={fetchMovieData}
                    hasMore={hasMore}
                    loader={<Loader />}
                >
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
));

ListPresenter.propTypes = {
    nowPlayingList: PropTypes.array,
    upcomingList: PropTypes.array,
    popularMovieList: PropTypes.array,
    hasMore: PropTypes.bool,
    fetchMovieData: PropTypes.func,
};

export default ListPresenter;
