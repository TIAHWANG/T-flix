import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import Company from "Components/Company";
import Cast from "Components/Cast";
import Tabs from "Components/Tabs";
import Video from "Components/Video";
import Country from "Components/Country";
import Recommend from "Components/Recommend";
import CollectionPoster from "Components/CollectionPoster";
import Season from "Components/Season";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        padding: 0px;
    }
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
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 95%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        width: 100%;
        font-size: 16px;
    }
`;

const Cover = styled.div`
    width: 50%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        width: 40%;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        display: none;
    }
`;

const Data = styled.div`
    min-width: 45%;
    width: 50%;
    margin: 10px 20px 0px;
    position: relative;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        width: 60%;
        margin: 20px 20px 0px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        width: 100%;
    }
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
    height: 82%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    padding-right: 10px;
`;

const TabContainer = styled.div`
    width: 100%;
`;

const Overview = styled.p`
    opacity: 0.7;
    line-height: 1.5;
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
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
`;

const CreatorContainer = styled.div`
    width: 100%;
    margin-right: 10px;
    display: flex;
`;

const CollectionContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const SeasonContainer = styled.div`
    width: 100%;
    display: flex;
`;

const SeasonScroll = styled.div`
    display: flex;
    overflow-x: auto;
    &::-webkit-scrollbar {
        height: 8px;
    }
    &::-webkit-scrollbar-track {
        border: 1px solid ${(props) => props.theme.pinkColor};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme.pinkColor};
    }
    margin-bottom: 10px;
`;

const VideoContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-right: 10px;
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_PC}) {
        grid-auto-rows: 300px;
    }
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_TABLET}) {
        grid-template-columns: repeat(1, 1fr);
        &:last-child {
            margin-bottom: 10px;
        }
    }
`;

const NoContentMessage = styled.div`
    font-size: 16px;
    opacity: 0.9;
`;

const RecommendContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
    margin-right: 10px;
`;

const CompanyContainer = styled.div`
    width: 100%;
    margin-top: 20px;
`;

const CompanyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
    text-align: center;
    border-bottom: 1px solid ${(props) => props.theme.pinkColor};
    border-top: 1px solid ${(props) => props.theme.pinkColor};
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    @media only screen and (max-width: ${(props) => props.theme.BREAK_POINT_MOBILE}) {
        grid-template-columns: repeat(3, 1fr);
    }
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
            <BackDrop
                bgImage={
                    result.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
                        : null
                }
            />
            <Content>
                <Cover
                    bgImage={
                        result.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require("../../Assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <MovieTitle>{result.title ? result.title : result.name}</MovieTitle>
                    <ItemContainer>
                        <Item>
                            {result.release_date
                                ? result.release_date.substring(0, 4)
                                : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.episode_run_time
                                ? result.episode_run_time[0]
                                : result.runtime !== 0
                                ? result.runtime
                                : 0}{" "}
                            min
                        </Item>
                        {result.imdb_id && (
                            <>
                                <Divider>•</Divider>
                                <Item
                                    style={{
                                        color: "#000000",
                                        backgroundColor: "#F5C517",
                                        fontWeight: 600,
                                        borderRadius: "3px",
                                        padding: "0px 5px",
                                    }}
                                >
                                    <Imdb
                                        target="_blank"
                                        href={`https://www.imdb.com/title/${result.imdb_id}`}
                                    >
                                        IMDb
                                    </Imdb>
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
                                                    index === result.genres.length - 1
                                                        ? genre.name
                                                        : `${genre.name} • `
                                                )}
                                            </Genre>
                                        </>
                                    )}
                                    <ItemTitle>Starring</ItemTitle>
                                    {staff && staff.cast.length > 0 ? (
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
                                    ) : (
                                        <NoContentMessage>
                                            No Starring Information{" "}
                                            <span role="img" aria-label="no videos">
                                                😢
                                            </span>
                                        </NoContentMessage>
                                    )}
                                    {result.created_by && result.created_by.length > 0 && (
                                        <>
                                            <ItemTitle>Creator</ItemTitle>
                                            <CreatorContainer>
                                                {result.created_by.map((creator) => (
                                                    <Cast
                                                        key={creator.id}
                                                        id={creator.id}
                                                        name={creator.name}
                                                        imageUrl={creator.profile_path}
                                                    />
                                                ))}
                                            </CreatorContainer>
                                        </>
                                    )}
                                    {result.belongs_to_collection && (
                                        <>
                                            <ItemTitle>Collection</ItemTitle>
                                            <CollectionContainer>
                                                <CollectionPoster
                                                    id={result.belongs_to_collection.id}
                                                    imageUrl={
                                                        result.belongs_to_collection.poster_path
                                                    }
                                                    title={result.belongs_to_collection.name}
                                                />
                                            </CollectionContainer>
                                        </>
                                    )}
                                    {result.seasons && result.seasons.length > 0 ? (
                                        result.seasons.length <= 3 ? (
                                            <>
                                                <ItemTitle>Seasons</ItemTitle>
                                                <SeasonContainer>
                                                    {result.seasons.map((season) => (
                                                        <Season
                                                            key={season.id}
                                                            id={season.season_number}
                                                            seasonNum={season.name}
                                                            imageUrl={season.poster_path}
                                                            title={result.name}
                                                        />
                                                    ))}
                                                </SeasonContainer>
                                            </>
                                        ) : (
                                            <>
                                                <ItemTitle>Seasons</ItemTitle>
                                                <SeasonScroll>
                                                    {result.seasons.map((season) => (
                                                        <Season
                                                            key={season.id}
                                                            id={season.season_number}
                                                            seasonNum={season.name}
                                                            imageUrl={season.poster_path}
                                                            title={result.name}
                                                        />
                                                    ))}
                                                </SeasonScroll>
                                            </>
                                        )
                                    ) : null}
                                </div>
                                <div label="Trailers +">
                                    <ItemTitle>Videos</ItemTitle>
                                    <VideoContainer>
                                        {result.videos.results.length > 0 ? (
                                            result.videos.results.map((video) => (
                                                <Video
                                                    key={video.id}
                                                    id={video.id}
                                                    videoUrl={video.key}
                                                    name={
                                                        video.name && video.name.length > 35
                                                            ? `${video.name.substring(0, 35)}...`
                                                            : video.name
                                                    }
                                                />
                                            ))
                                        ) : (
                                            <NoContentMessage>
                                                No Related Videos{" "}
                                                <span role="img" aria-label="no videos">
                                                    😢
                                                </span>
                                            </NoContentMessage>
                                        )}
                                    </VideoContainer>
                                </div>
                                <div label="More Like This">
                                    <>
                                        <ItemTitle>Recommendations</ItemTitle>
                                        {recommend.results && recommend.results.length > 0 ? (
                                            <RecommendContainer>
                                                {recommend.results.map((movie) => (
                                                    <Recommend
                                                        key={movie.id}
                                                        id={movie.id}
                                                        imageUrl={movie.backdrop_path}
                                                        title={
                                                            movie.title ? movie.title : movie.name
                                                        }
                                                        rating={movie.vote_average}
                                                        isMovie={movie.title ? true : false}
                                                    />
                                                ))}
                                            </RecommendContainer>
                                        ) : (
                                            <NoContentMessage>
                                                Nothing to Recommend{" "}
                                                <span role="img" aria-label="no videos">
                                                    😢
                                                </span>
                                            </NoContentMessage>
                                        )}
                                    </>
                                </div>
                                <div label="Details">
                                    <CompanyContainer>
                                        <ItemTitle>Production Companies</ItemTitle>
                                        {result.production_companies &&
                                        result.production_companies.length > 0 ? (
                                            <CompanyGrid style={{ gridAutoRows: "80px" }}>
                                                {result.production_companies.map((company) => (
                                                    <Company
                                                        key={company.id}
                                                        id={company.id}
                                                        name={company.name}
                                                        logoUrl={company.logo_path}
                                                    />
                                                ))}
                                            </CompanyGrid>
                                        ) : (
                                            <NoContentMessage>
                                                No Information{" "}
                                                <span role="img" aria-label="no videos">
                                                    😢
                                                </span>
                                            </NoContentMessage>
                                        )}
                                    </CompanyContainer>
                                    {result.production_countries &&
                                        result.production_countries.length > 0 && (
                                            <CompanyContainer>
                                                <ItemTitle>Production Countries</ItemTitle>
                                                <CompanyGrid style={{ gridAutoRows: "40px" }}>
                                                    {result.production_countries.map((country) => (
                                                        <Country
                                                            key={country.iso_3166_1}
                                                            id={country.iso_3166_1}
                                                            name={country.name}
                                                        />
                                                    ))}
                                                </CompanyGrid>
                                            </CompanyContainer>
                                        )}
                                    {result.networks && result.networks.length > 0 && (
                                        <CompanyContainer>
                                            <ItemTitle>Networks</ItemTitle>
                                            <CompanyGrid style={{ gridAutoRows: "80px" }}>
                                                {result.networks.map((network) => (
                                                    <Company
                                                        key={network.id}
                                                        id={network.id}
                                                        name={network.name}
                                                        logoUrl={network.logo_path}
                                                    />
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
