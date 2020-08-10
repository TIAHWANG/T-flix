import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation, useParams, useHistory } from "react-router-dom";

import { moviesApi, tvApi } from "../api";
import Loader from "../Components/Loader";
import Company from "../Components/Company";
import Cast from "../Components/Cast";
import Tabs from "../Components/Tabs";
import Video from "../Components/Video";
import Country from "../Components/Country";
import Recommend from "../Components/Recommend";
import CollectionPoster from "../Components/CollectionPoster";
import Season from "../Components/Season";

import {
    Container,
    BackDrop,
    Content,
    Cover,
    Data,
    MovieTitle,
    ItemContainer,
    Item,
    Imdb,
    Divider,
    Description,
    TabContainer,
    Overview,
    ItemTitle,
    Genre,
    CastScroll,
    CreatorContainer,
    CollectionContainer,
    SeasonContainer,
    SeasonScroll,
    VideoContainer,
    NoContentMessage,
    RecommendContainer,
    CompanyContainer,
    CompanyGrid,
} from "../Styles/DetailStyle";

const Detail = () => {
    const { id } = useParams();
    const { push } = useHistory();
    const { pathname } = useLocation();

    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [staff, setStaff] = useState([]);
    const [recommend, setRecommend] = useState([]);

    const getDetailData = async () => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        try {
            const isMovie = pathname.includes("/movie/");
            if (isMovie) {
                const { data: detail } = await moviesApi.movieDetail(parsedId);
                const { data: staff } = await moviesApi.movieCast(parsedId);
                const { data: recommend } = await moviesApi.recommendMovie(parsedId);
                setDetail(detail);
                setStaff(staff);
                setRecommend(recommend);
            } else {
                const { data: detail } = await tvApi.showDetail(parsedId);
                const { data: staff } = await tvApi.tvCast(parsedId);
                const { data: recommend } = await tvApi.recommendTv(parsedId);
                setDetail(detail);
                setStaff(staff);
                setRecommend(recommend);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDetailData();
    }, [pathname]);

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
                <title>{detail.title ? detail.title : detail.name} | T-flix</title>
            </Helmet>
            <BackDrop
                bgImage={
                    detail.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
                        : null
                }
            />
            <Content>
                <Cover
                    bgImage={
                        detail.poster_path
                            ? `https://image.tmdb.org/t/p/original${detail.poster_path}`
                            : require("../Assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <MovieTitle>{detail.title ? detail.title : detail.name}</MovieTitle>
                    <ItemContainer>
                        <Item>
                            {detail.release_date
                                ? detail.release_date.slice(0, 4)
                                : detail.first_air_date.slice(0, 4)}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {detail.episode_run_time
                                ? detail.episode_run_time[0]
                                : detail.runtime !== 0
                                ? detail.runtime
                                : 0}{" "}
                            min
                        </Item>
                        {detail.imdb_id && (
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
                                        href={`https://www.imdb.com/title/${detail.imdb_id}`}
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
                            {detail.vote_average} / 10
                        </Item>
                    </ItemContainer>
                    <Description>
                        <Overview>{detail.overview}</Overview>
                        <TabContainer>
                            <Tabs>
                                <div label="Overview">
                                    {detail.genres && detail.genres.length > 0 && (
                                        <>
                                            <ItemTitle>Genres</ItemTitle>
                                            <Genre>
                                                {detail.genres.map((genre, index) =>
                                                    index === detail.genres.length - 1
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
                                    {detail.created_by && detail.created_by.length > 0 && (
                                        <>
                                            <ItemTitle>Creator</ItemTitle>
                                            <CreatorContainer>
                                                {detail.created_by.map((creator) => (
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
                                    {detail.belongs_to_collection && (
                                        <>
                                            <ItemTitle>Collection</ItemTitle>
                                            <CollectionContainer>
                                                <CollectionPoster
                                                    id={detail.belongs_to_collection.id}
                                                    imageUrl={
                                                        detail.belongs_to_collection.poster_path
                                                    }
                                                    title={detail.belongs_to_collection.name}
                                                />
                                            </CollectionContainer>
                                        </>
                                    )}
                                    {detail.seasons && detail.seasons.length > 0 ? (
                                        detail.seasons.length <= 3 ? (
                                            <>
                                                <ItemTitle>Seasons</ItemTitle>
                                                <SeasonContainer>
                                                    {detail.seasons.map((season) => (
                                                        <Season
                                                            key={season.id}
                                                            id={season.season_number}
                                                            seasonNum={season.name}
                                                            imageUrl={season.poster_path}
                                                            title={detail.name}
                                                        />
                                                    ))}
                                                </SeasonContainer>
                                            </>
                                        ) : (
                                            <>
                                                <ItemTitle>Seasons</ItemTitle>
                                                <SeasonScroll>
                                                    {detail.seasons.map((season) => (
                                                        <Season
                                                            key={season.id}
                                                            id={season.season_number}
                                                            seasonNum={season.name}
                                                            imageUrl={season.poster_path}
                                                            title={detail.name}
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
                                        {detail.videos.results.length > 0 ? (
                                            detail.videos.results.map((video) => (
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
                                        {detail.production_companies &&
                                        detail.production_companies.length > 0 ? (
                                            <CompanyGrid style={{ gridAutoRows: "80px" }}>
                                                {detail.production_companies.map((company) => (
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
                                    {detail.production_countries &&
                                        detail.production_countries.length > 0 && (
                                            <CompanyContainer>
                                                <ItemTitle>Production Countries</ItemTitle>
                                                <CompanyGrid style={{ gridAutoRows: "40px" }}>
                                                    {detail.production_countries.map((country) => (
                                                        <Country
                                                            key={country.iso_3166_1}
                                                            id={country.iso_3166_1}
                                                            name={country.name}
                                                        />
                                                    ))}
                                                </CompanyGrid>
                                            </CompanyContainer>
                                        )}
                                    {detail.networks && detail.networks.length > 0 && (
                                        <CompanyContainer>
                                            <ItemTitle>Networks</ItemTitle>
                                            <CompanyGrid style={{ gridAutoRows: "80px" }}>
                                                {detail.networks.map((network) => (
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
};

Detail.propTypes = {
    detail: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
};

export default Detail;
