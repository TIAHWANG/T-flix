import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Loader from "Components/Loader";
import ActorImage from "../../Components/ActorImage";

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
    filter: blur(6px);
    opacity: 0.6;
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
    margin: 10px 20px;
    position: relative;
    overflow: hidden;
`;

const ActorName = styled.h3`
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
    height: 85%;
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

const ItemTitle = styled.div`
    font-weight: 600;
    &:not(:first-child) {
        margin-top: 20px;
    }
    margin-bottom: 5px;
    opacity: 0.9;
`;

const Biography = styled.p`
    opacity: 0.7;
    margin-bottom: 20px;
`;

const NoContentMessage = styled.div`
    font-size: 16px;
    opacity: 0.9;
`;

const ImageContainer = styled.div`
    display: flex;
    width: 100%;
`;

const ImageScroll = styled.div`
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

export default ({ person, error, loading }) =>
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
                <title>{person.name} | T-flix</title>
            </Helmet>
            <BackDrop bgImage={person.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : null} />
            <Content>
                <Cover
                    bgImage={person.profile_path ? `https://image.tmdb.org/t/p/original${person.profile_path}` : require("../../Assets/noActor.png")}
                />
                <Data>
                    <ActorName>{person.name ? person.name : "No Name"}</ActorName>
                    <ItemContainer>
                        {person.birthday && (
                            <Item>
                                {person.birthday.substring(0, 4)} ~ {person.deathday && person.deathday.substring(0, 4)}
                            </Item>
                        )}

                        {person.known_for_department && (
                            <>
                                {person.birthday && <Divider>•</Divider>}
                                <Item>{person.known_for_department}</Item>
                            </>
                        )}
                        {person.imdb_id && (
                            <>
                                {person.known_for_department && <Divider>•</Divider>}
                                <Item
                                    style={{ color: "#000000", backgroundColor: "#F5C517", fontWeight: 600, borderRadius: "3px", padding: "0px 5px" }}
                                >
                                    <Imdb target="_blank" href={`https://www.imdb.com/name/${person.imdb_id}`}>
                                        IMDb
                                    </Imdb>
                                </Item>
                            </>
                        )}
                    </ItemContainer>
                    <Description>
                        <ItemTitle>Born In</ItemTitle>
                        {person.place_of_birth ? (
                            <Biography>{person.place_of_birth}</Biography>
                        ) : (
                            <NoContentMessage>
                                No Information{" "}
                                <span role="img" aria-label="no videos">
                                    😢
                                </span>
                            </NoContentMessage>
                        )}
                        <ItemTitle>Biography</ItemTitle>
                        {person.biography ? (
                            <Biography>{person.biography}</Biography>
                        ) : (
                            <NoContentMessage>
                                No Information{" "}
                                <span role="img" aria-label="no videos">
                                    😢
                                </span>
                            </NoContentMessage>
                        )}
                        <ItemTitle>Images</ItemTitle>
                        {person.images.profiles && person.images.profiles.length > 0 ? (
                            <>
                                {person.images.profiles.length <= 6 ? (
                                    <ImageContainer>
                                        {person.images.profiles.map((image, index) => (
                                            <ActorImage key={index} id={index} imageUrl={image.file_path} />
                                        ))}
                                    </ImageContainer>
                                ) : (
                                    <ImageScroll>
                                        {person.images.profiles.map((image, index) => (
                                            <ActorImage key={index} id={index} imageUrl={image.file_path} />
                                        ))}
                                    </ImageScroll>
                                )}
                            </>
                        ) : (
                            <NoContentMessage>
                                No Images{" "}
                                <span role="img" aria-label="no videos">
                                    😢
                                </span>
                            </NoContentMessage>
                        )}
                    </Description>
                </Data>
            </Content>
        </Container>
    );
