import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";

import { personApi } from "../api";
import Loader from "../Components/Loader";
import ActorImage from "../Components/ActorImage";
import {
    Container,
    BackDrop,
    Content,
    Cover,
    Data,
    ActorName,
    ItemContainer,
    Item,
    Imdb,
    Divider,
    Description,
    ItemTitle,
    Biography,
    NoContentMessage,
    ImageContainer,
    ImageScroll,
} from "../Styles/PersonStyle";

const Person = () => {
    const { id } = useParams();
    const { push } = useHistory();

    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState([]);
    const [imageUrl, setImageUrl] = useState(require("../Assets/noActor.png"));
    const [backDropUrl, setBackDropUrl] = useState(null);

    const getPersonData = async () => {
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        try {
            const { data: person } = await await personApi.person(parsedId);
            setPerson(person);
            setImageUrl(`https://image.tmdb.org/t/p/original${person.profile_path}`);
            setBackDropUrl(`https://image.tmdb.org/t/p/original${person.profile_path}`);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const clickImage = (path) => {
        if (window.innerWidth <= 992) {
            return () => {
                setBackDropUrl(`https://image.tmdb.org/t/p/original${path}`);
            };
        } else {
            return () => {
                setImageUrl(`https://image.tmdb.org/t/p/original${path}`);
            };
        }
    };

    useEffect(() => {
        getPersonData();
    }, []);

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
                <title>{person.name} | T-flix</title>
            </Helmet>
            <BackDrop bgImage={person.profile_path ? backDropUrl : null} />
            <Content>
                <Cover
                    bgImage={person.profile_path ? imageUrl : require("../Assets/noActor.png")}
                />
                <Data>
                    <ActorName>{person.name ? person.name : "No Name"}</ActorName>
                    <ItemContainer>
                        {person.birthday && (
                            <Item>
                                {person.birthday.substring(0, 4)} ~{" "}
                                {person.deathday && person.deathday.substring(0, 4)}
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
                                        href={`https://www.imdb.com/name/${person.imdb_id}`}
                                    >
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
                                {person.images.profiles.length <= 5 ? (
                                    <ImageContainer>
                                        {person.images.profiles.map((image, index) => (
                                            <ActorImage
                                                onClick={clickImage(image.file_path)}
                                                key={index}
                                                id={index}
                                                imageUrl={image.file_path}
                                            />
                                        ))}
                                    </ImageContainer>
                                ) : (
                                    <ImageScroll>
                                        {person.images.profiles.map((image, index) => (
                                            <ActorImage
                                                onClick={clickImage(image.file_path)}
                                                key={index}
                                                id={index}
                                                imageUrl={image.file_path}
                                            />
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
};

Person.propTypes = {
    person: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool,
    imageUrl: PropTypes.string,
    backDropUrl: PropTypes.string,
    clickImage: PropTypes.func,
};

export default Person;
