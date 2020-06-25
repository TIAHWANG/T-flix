import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import Company from "Components/Company";
import Cast from "Components/Cast";
import Tabs from "Components/Tabs";
import Video from "Components/Video";
import Poster from "Components/Poster";
import "Styles/Tabs.scss";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(4px);
    opacity: 0.7;
`;

const Content = styled.div`
    display: flex;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    width: 80%;
    height: 100%;
    position: relative;
    z-index: 1;
    font-size: 18px;
`;

const Cover = styled.div`
    width: 50%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    min-width: 45%;
    width: 50%;
    margin: 10px 20px 0px;
    position: relative;
    overflow: hidden;
`;

const MovieTitle = styled.h3`
    font-size: 30px;
    font-weight: 600;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
    display: flex;
`;

const Item = styled.span`
    padding: 2px 0px;
`;

const Imdb = styled.a`
    vertical-align: text-bottom;
`;

const Divider = styled.div`
    margin: 0 10px;
`;

const Description = styled.div`
    line-height: 1.5;
    width: 100%;
    height: 83%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
`;

const TabContainer = styled.div`
    width: 100%;
`;

const Overview = styled.p`
    opacity: 0.7;
    margin-bottom: 20px;
`;

const ItemTitle = styled.div`
    font-weight: 600;
    &:not(:first-child) {
        margin-top: 20px;
    }
    margin-bottom: 5px;
    opacity: 0.9;
`;

const Genre = styled.div`
    font-size: 16px;
    opacity: 0.9;
`;

const CastScroll = styled.div`
    display: flex;
    margin-right: 10px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
`;

const CastContainer = styled.div`
    width: 100%;
    display: flex;
`;

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-right: 10px;
`;

const NoVideoMessage = styled.div`
    font-size: 16px;
    opacity: 0.9;
`;

const RecommendContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-right: 10px;
`;

const CompanyContainer = styled.div`
    width: 100%;
`;

const CompanyName = styled.div`
    margin: 10px 0px;
`;

const CompanyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
    text-align: center;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    padding: 10px 0px;
    background-color: rgba(255, 255, 255, 0.3);
`;

const DetailPresenter = ({ result, staff, recommend, error, loading }) =>
    loading ? (
        <>
            <Helmet>
                <title>Loading | T-flix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        <Container>
            <Helmet>
                <title>{result.title ? result.title : result.name} | T-flix</title>
            </Helmet>
            <BackDrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
            <Content>
                <Cover
                    bgImage={
                        result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../Assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <MovieTitle>{result.title ? result.title : result.name}</MovieTitle>
                    <ItemContainer>
                        <Item>{result.release_date ? result.release_date.substring(0, 4) : result.first_air_date.substring(0, 4)}</Item>
                        <Divider>•</Divider>
                        <Item>{result.episode_run_time ? result.episode_run_time[0] : result.runtime !== 0 ? result.runtime : 0} min</Item>
                        {result.imdb_id && (
                            <>
                                <Divider>•</Divider>
                                <Item
                                    style={{ color: "#000000", backgroundColor: "#F5C517", fontWeight: 600, borderRadius: "3px", padding: "0px 5px" }}
                                >
                                    <Imdb href={`https://www.imdb.com/title/${result.imdb_id}`}>IMDb</Imdb>
                                </Item>
                            </>
                        )}
                        <Divider>•</Divider>
                        <Item>
                            <span role="img" aria-label="rating">
                                ⭐{" "}
                            </span>
                            {result.vote_average} / 10
                        </Item>
                    </ItemContainer>
                    <Description>
                        <Overview>{result.overview}</Overview>
                        <TabContainer>
                            <Tabs>
                                <div label="Overview">
                                    {result.genres && result.genres.length > 0 && (
                                        <>
                                            <ItemTitle>Genres</ItemTitle>
                                            <Genre>
                                                {result.genres.map((genre, index) =>
                                                    index === result.genres.length - 1 ? genre.name : `${genre.name} • `
                                                )}
                                            </Genre>
                                        </>
                                    )}
                                    {staff && staff.cast.length > 0 && (
                                        <>
                                            <ItemTitle>Starring</ItemTitle>
                                            {staff.cast.length <= 6 ? (
                                                <CastContainer>
                                                    {staff.cast.map((actor) => (
                                                        <Cast
                                                            key={actor.id}
                                                            id={actor.id}
                                                            name={actor.name}
                                                            imageUrl={actor.profile_path}
                                                            character={actor.character}
                                                        />
                                                    ))}
                                                </CastContainer>
                                            ) : (
                                                <CastScroll>
                                                    {staff.cast.map((actor) => (
                                                        <Cast
                                                            key={actor.id}
                                                            id={actor.id}
                                                            name={actor.name}
                                                            imageUrl={actor.profile_path}
                                                            character={actor.character}
                                                        />
                                                    ))}
                                                </CastScroll>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div label="Trailers +">
                                    <ItemTitle>Videos</ItemTitle>
                                    <VideoContainer>
                                        {result.videos.results.length > 0 ? (
                                            result.videos.results.map((video) => (
                                                <Video key={video.id} id={video.id} videoUrl={video.key} name={video.name} />
                                            ))
                                        ) : (
                                            <NoVideoMessage>
                                                No Related Videos{" "}
                                                <span role="img" aria-label="no videos">
                                                    😢
                                                </span>
                                            </NoVideoMessage>
                                        )}
                                    </VideoContainer>
                                </div>
                                <div label="More Like This">
                                    <>
                                        <ItemTitle>Recommendations</ItemTitle>
                                        <RecommendContainer>
                                            {recommend.results && recommend.results.length > 0
                                                ? recommend.results.map((movie) => (
                                                      <Poster
                                                          key={movie.id}
                                                          id={movie.id}
                                                          imageUrl={movie.backdrop_path}
                                                          title={movie.title ? movie.title : movie.name}
                                                          rating={movie.vote_average}
                                                          isMovie={movie.title ? true : false}
                                                      />
                                                  ))
                                                : null}
                                        </RecommendContainer>
                                    </>
                                </div>
                                <div label="Details">
                                    {result.production_companies && result.production_companies.length > 0 && (
                                        <CompanyContainer>
                                            <CompanyName>Production Companies</CompanyName>
                                            <CompanyGrid>
                                                {result.production_companies.map((company) => (
                                                    <Company key={company.id} id={company.id} name={company.name} logoUrl={company.logo_path} />
                                                ))}
                                            </CompanyGrid>
                                        </CompanyContainer>
                                    )}
                                </div>
                            </Tabs>
                        </TabContainer>
                    </Description>
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
