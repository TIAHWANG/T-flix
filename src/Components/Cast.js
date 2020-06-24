import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
    margin-top: 5px;
    margin-bottom: 10px;
`;

const Image = styled.div`
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 80px;
    height: 60px;
    border-radius: 5px;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const Name = styled.div`
    font-size: 12px;
    font-weight: 600;
    opacity: 0.9;
`;

const Character = styled.div`
    font-size: 10px;
    opacity: 0.9;
`;

const Cast = ({ id, name, character, imageUrl }) => (
    <Container>
        <Image bgUrl={imageUrl ? `https://image.tmdb.org/t/p/original${imageUrl}` : require("../Assets/noActor.png")} />
        <Name>{name && name.length > 10 ? `${name.substring(0, 10)}..` : name}</Name>
        <Character>{character && character.length > 13 ? `${character.substring(0, 13)}..` : character}</Character>
    </Container>
);

Cast.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
};

export default Cast;
